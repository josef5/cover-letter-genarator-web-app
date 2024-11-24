import { Request, Response, NextFunction } from "express";
import { ErrorResponse, AppError } from "../types";

export const errorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const error: ErrorResponse = {
    message: err.message || "Server Error",
    status: err.status || 500,
  };

  if (process.env.NODE_ENV === "development") {
    error.stack = err.stack;
  }

  res.status(error.status).json(error);
};
