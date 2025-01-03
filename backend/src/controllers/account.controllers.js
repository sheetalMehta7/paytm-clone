import mongoose from "mongoose";
import { Account } from "../models/account.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { User } from "../models/user.model.js";
import { z } from "zod";

const amountTransferSchema = z.object({
amount: z.number().positive(),
to: z.string()
});

const accountBalance = asyncHandler(async (req, res) => {
  const balance = await Account.findOne({userId: req.user._id}).select("-userId");

  if (!balance) {
    return res.status(500).json(new ApiError(500, "Failed to fetch user account balance."))
  }
  return res.status(200).json(new ApiResponse(200, "", balance.balance));
});

const amountTransfer = asyncHandler(async (req, res) => {
  // Start a session
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const { amount, to } = amountTransferSchema.parse(req.body);

    if (!amount || !to) {
      return res.status(400).json(new ApiError(400, "Amount and recipient are required."));
    }
    
    if(to === req.user._id.toString()){
      return res.status(400).json(new ApiError(400, "You can't transfer money to yourself."));
    }
    // Fetch the debit account (sender's account)
    const debitAccount = await Account.findOne({ userId: req.user._id }).session(session);
    if (!debitAccount || debitAccount.balance < amount) {
      return res.status(400).json(new ApiError(400, "Insufficient balance."));
    }

    // Fetch the recipient (credit account holder)
    const creditAccountHolder = await User.findById(to).session(session);
    if (!creditAccountHolder) {
      return res.status(400).json(new ApiError(400, "Invalid account."));
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

    res.status(200).json(new ApiResponse(200, "Money transfered successfully."));
  } catch (error) {
    // Rollback transaction on error
    await session.abortTransaction();
    session.endSession();

    if(error instanceof z.ZodError){
      return res.status(400).json(new ApiError(400, "Invalid amount or user id."));
    }

    res.status(500).json(new ApiError(500, "Failed to transfer money."))
  }
});

export { accountBalance, amountTransfer };
