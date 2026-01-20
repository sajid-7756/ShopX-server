import type { Request, Response, NextFunction } from "express";
import express from "express";
import { User } from "../schemas/userSchema.js";
import { signToken } from "../utils/auth.js";

const router = express.Router();

router.post(
  "/register",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email } = req.body;
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(409).json({
          success: false,
          message: "User already exists",
        });
      }

      const user = await User.create(req.body);
      const token = signToken(user._id.toString());

      res.status(201).json({
        success: true,
        user,
        token,
      });
    } catch (error) {
      next(error);
    }
  },
);

router.post(
  "/login",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email }).select("+password");

      if (!user) {
        return res.status(401).json({
          message: "Invalid credentials",
        });
      }

      const match = await user.comparePassword(password);

      if (!match) {
        return res.status(401).json({
          message: "Invalid credentials",
        });
      }

      const token = signToken(user._id.toString());

      res.status(200).json({
        success: true,
        user,
        token,
      });
    } catch (error) {
      next(error);
    }
  },
);

export default router;
