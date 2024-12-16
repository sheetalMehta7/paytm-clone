import { User } from "../models/user.model";
import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/AsyncHandler";
import jwt from "jsonwebtoken";

export const verifyJWT = asyncHandler(async (req, _res, next) => {
  try {
    const accessToken = req.header("Authorization")?.repalce("Bearer ", "");

    if (!accessToken) {
      throw new ApiError(401, "Unauthorized request.");
    }

    const decodedToken = jwt.decode(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET
    );

    const user = await User.findById(decodedToken?._id).select("-password");

    if (!user) {
      throw new ApiError(401, "Invalid access token.");
    }

    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid access token.");
  }
});
