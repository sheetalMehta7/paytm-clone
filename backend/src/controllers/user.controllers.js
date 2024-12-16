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

const updateDetailsSchema = z.object({
  firstname: z.string().trim().optional(),
  lastname: z.string().trim().optional(),
  password: z.string().min(8).trim().optional(),
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
      throw new ApiError(500, "Something went wrong while registering user.");
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

const updateDetails = asyncHandler(async (req, res, next) => {
  // get the user
  // validate the user data
  // hash the password

  try {
    const userData = updateDetailsSchema.parse(req.body);
    const updates = {};
    if (userData.firstname) updates.firstname = userData.firstname;
    if (userData.lastname) updates.lastname = userData.lastname;
    if (userData.password) updates.password = userData.password;

    const user = await User.findByIdAndUpdate(
      req.user?._id,
      {
        $set: updates,
      },
      { new: true }
    ).select("-password");

    return res
      .status(200)
      .json(new ApiResponse(200, "User details updated successfully.", user));
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new ApiError(400, "Incorrect user input.", error.errors);
    } else {
      throw new ApiError(
        500,
        "Something went wrong while updating user details."
      );
    }
  }
});

const findUser = asyncHandler(async (req, res, next) => {
  const { filter } = req.query;

  const users = await User.find({
    $or: [{ firstname: { $regex: filter } }, { lastname: { $regex: filter } }],
  }).select("-password");

  return res.status(200).json(new ApiResponse(200, "", users));
});

export { registerUser, loginUser, updateDetails, findUser };
