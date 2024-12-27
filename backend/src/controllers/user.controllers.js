import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { z } from "zod";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Account } from "../models/account.model.js";
import mongoose from "mongoose";

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
  // Start a session for transaction
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const userData = userRegistrationSchema.parse(req.body);
    const userExists = await User.findOne({ email: userData.email });
    if (userExists) {
      return res
        .status(409)
        .json(new ApiError(409, "Email already registered."));
    }

    const user = await User.create([userData], { session });
    const balance = Math.random() * 1000;

    // Create an account for the user
    const account = await Account.create(
      [
        {
          userId: user[0]._id,
          balance: balance.toFixed(2),
        },
      ],
      { session }
    );

    // Commit the transaction
    await session.commitTransaction();
    session.endSession();

    const createdUser = await User.findById(user[0]._id).select("-password");

    return res
      .status(200)
      .json(new ApiResponse(200, "User successfully registered.", createdUser));
  } catch (err) {
    // Abort the transaction in case of any error
    await session.abortTransaction();
    session.endSession();

    if (err instanceof z.ZodError) {
      return res
        .status(400)
        .json(new ApiError(400, "Validation errors", err.errors));
    }

    res
      .status(500)
      .json(
        new ApiError(500, "Something went wrong while registering the user.")
      );
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
      return res.status(400).json(new ApiError(400, "User not found."));
    }

    const correctPassword = await user.comparePassword(userData.password);
    if (!correctPassword) {
      return res.status(400).json(new ApiError(401, "Incorrect password."));
    }

    const accessToken = user.generateAccessToken();

    return res.status(200).json(
      new ApiResponse(200, "User logged in successfully.", {
        token: accessToken,
      })
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res
        .status(400)
        .json(new ApiError(400, "Validation errors", error.errors));
    }
    res.status(400).json(new ApiError(500, "Failed to login user"));
  }
});

const updateDetails = asyncHandler(async (req, res) => {
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
      return res
        .status(400)
        .json(new ApiError(400, "Incorrect user input.", error.errors));
    }
    res
      .status(500)
      .json(
        new ApiError(500, "Something went wrong while updating user details.")
      );
  }
});

const findUser = asyncHandler(async (req, res) => {
  const filter = req.query.filter ? req.query.filter.trim() : "";

  const users = await User.find({
    $or: [{ firstname: { $regex: filter, $options: "i" } }, { lastname: { $regex: filter, $options: "i" } }],
  }).select("-password");

  return res.status(200).json(new ApiResponse(200, "", users));
});

export { registerUser, loginUser, updateDetails, findUser };
