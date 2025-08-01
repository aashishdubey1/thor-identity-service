import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import serverConfig from "../config/server-config";
import { StatusCodes } from "http-status-codes";

interface AuthPayload {
  userId: string;
}

export interface AuthenticatedRequest extends Request {
  user?: AuthPayload;
}

export const validateUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token: string | undefined;


  if (req.headers.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }


  if (!token) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      success: false,
      message: "Not authorized: No token provided.",
    });
  }

  try {
    const decoded = jwt.verify(
      token,
      serverConfig.ACCESS_SECRET!
    ) as AuthPayload;

    (req as AuthenticatedRequest).user = { userId: decoded.userId };

    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        success: false,
        message: "Not authorized: Token has expired.",
      });
    }

    return res.status(StatusCodes.UNAUTHORIZED).json({
      success: false,
      message: "Not authorized: Invalid token.",
    });
  }
};
