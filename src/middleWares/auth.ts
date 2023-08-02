import config from "config";
import express from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

import { merge } from "lodash";

import messages from "../utils/messages";
import User from "../models/user";
import mongoose from "mongoose";

interface AuthenticatedRequest extends express.Request {
  user: {
    id: mongoose.Types.ObjectId;
  };
}

const auth = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  // Get the token from the Authorization header
  const token = req.headers.authorization?.split(" ")[1];

  // If there's no token, return an error
  if (!token) {
    return res
      .status(401)
      .send({ message: messages.general.missingFieldErr("Access token") });
  }

  try {
    // Verify the token using the JWT secret key
    const decoded = jwt.verify(
      token,
      config.get("secrets.jwtPrivateKey")
    ) as JwtPayload;

    const user = await User.findById(decoded.user.id).lean();
    if (!user) {
      return { status: 404, message: messages.general.notFoundErr("User") };
    }

    // Add the decoded user object to the request object for further use
    merge(req, { user: decoded.user });

    // Call the next middleware function
    next();
  } catch (err) {
    const { name, message } = err;
    // If the token is invalid, return an error
    return res.status(401).send({ message: `${name}: ${message}` });
  }
};

export default auth;
export { AuthenticatedRequest };
