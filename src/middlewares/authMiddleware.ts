import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../schemas/userSchema.js";

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

const VerifyJWT = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "Unauthorized access",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: string;
    };

    req.user = await User.findById(decoded.id);
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({
      message: "Invalid token",
    });
  }
};

export default VerifyJWT;
