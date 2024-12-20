import mongoose from "mongoose";
import { Account } from "../models/account.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { User } from "../models/user.model.js";

const accountBalance = asyncHandler(async (req, res) => {
  const balance = await Account.findById(req.user._id).select("-userid");

  if (!balance) {
    throw new ApiError(500, "Failed to fetch user account balance.");
  }
  return res.status(200).json(new ApiResponse(200, balance, ""));
});

const amountTransfer = asyncHandler(async (req, res, next) => {
  // Start a session
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const { amount, to } = req.body;
    if (!amount || !to) {
      throw new ApiError(400, "Amount and recipient are required.");
    }

    // Fetch the debit account (sender's account)
    const debitAccount = await Account.findOne({ userId: req.user._id }).session(session);
    if (!debitAccount || debitAccount.balance < amount) {
      throw new ApiError(400, "Insufficient balance.");
    }

    // Fetch the recipient (credit account holder)
    const creditAccountHolder = await User.findById(to).session(session);
    if (!creditAccountHolder) {
      throw new ApiError(400, "Invalid account.");
    }

    // Update the sender's balance (debit)
    await Account.updateOne(
      { userId: req.user._id },
      { $inc: { balance: -amount } },
      { session }
    );

    // Update the recipient's balance (credit)
    await Account.updateOne(
      { userId: to },
      { $inc: { balance: amount } },
      { session }
    );

    // Commit the transaction
    await session.commitTransaction();
    session.endSession();

    res.status(200).json({ message: "Transfer successful." });
  } catch (error) {
    // Rollback transaction on error
    await session.abortTransaction();
    session.endSession();
  }
});

export { accountBalance, amountTransfer };
