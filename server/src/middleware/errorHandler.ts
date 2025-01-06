import { Request, Response, NextFunction } from "express";
import { ErrorResponse, AppError } from "../types";

/**
 * Express middleware for handling errors in the application.
 *
 * @param err - The error object, expected to be an instance of AppError.
 * @param req - The Express request object.
 * @param res - The Express response object.
 * @param next - The next middleware function in the stack.
 *
 * Constructs an ErrorResponse from the provided error and sends it as a JSON
 * response with the appropriate HTTP status code. If the application is running
 * in development mode, the error stack trace is included in the response.
 */
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
