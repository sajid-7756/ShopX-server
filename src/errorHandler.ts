import type { NextFunction, Request, Response } from "express";

function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (res.headersSent) {
    return next(err);
  }

  res.status(500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
}

export default errorHandler;
