import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/AsyncHandler";
import { z } from "zod";
import { User } from "../models/user.model";
import { ApiResponse } from "../utils/ApiResponse";

const userRegistrationSchema = z.object({
  firstname: z.string().trim(),
  lastname: z.string().trim(),
  email: z.string().email().trim(),
  password: z.string().min(8).trim(),
});

const userLoginSchema = z.object({
  email: z.string().email().trim(),
  password: z.string().min(8).trim(),
});

const registerUser = asyncHandler(async (req, res) => {
  // get data from the frontend
  // do the validation
  // if everything is okay check if the email id already exists
  // add user to db.
  // hash the password

  try {
    const userData = userRegistrationSchema.parse(req.body);

    const userExists = User.findOne({ email: userData.email });
    if (userExists) {
      throw new ApiError(409, "Email already registered.");
    }

    const user = await User.create(userData);

    const createdUser = await User.findById(user._id).select("-password");

    if (!createdUser) {
      throw new ApiError(500, "Something went wrong while regestering user.");
    }

    return res
      .status(200)
      .json(
        new ApiResponse(200, createdUser, "User successfully resgistered.")
      );
  } catch (error) {
    if (err instanceof z.ZodError) {
      throw new ApiError(400, "Validation errors", error.errors);
    } else {
      throw new ApiError(500, "Something went wrong while regestering user.");
    }
  }
});

const loginUser = asyncHandler(async (req, res) => {
  // get data from user
  // validate the data
  // check user email exists
  // compare password
  // authenticate the user
  //return jwt
  try {
    const userData = userLoginSchema.parse(req.body);

    const user = await User.findOne({ email: userData.email });
    if (!user) {
      throw new ApiError(400, "User not found.");
    }

    const correctPassword = await User.comparePassword(userData.password);

    if (!correctPassword) {
      throw new ApiError(401, "Incorrect password.");
    }

    const accessToken = user.generateAccessToken();

    return res.status(200).json(
      new ApiResponse(200, "User logged in successfully.", {
        token: accessToken,
      })
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new ApiError(400, "Validation errors", error.errors);
    } else {
      throw new ApiError(500, "Failed to login user");
    }
  }
});

export { registerUser };
