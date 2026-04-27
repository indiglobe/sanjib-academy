import { AuthError } from "@/lib/error";
import { NextFunction, Request, Response } from "express";

export function errorMiddleware(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (err instanceof AuthError) {
  }

  const statusCode = err.status || 500;

  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",

    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
}
