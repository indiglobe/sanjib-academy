import { Request, Response, NextFunction } from "express";

function getTime(): string {
  const now = new Date();

  const pad = (n: number) => n.toString().padStart(2, "0");

  const hours = pad(now.getHours());
  const minutes = pad(now.getMinutes());
  const seconds = pad(now.getSeconds());

  return `${hours}:${minutes}:${seconds}`;
}

/**
 * A simple logger middleware to show request details.
 */
export const loggerMiddleware = (
  req: Request,
  _res: Response,
  next: NextFunction,
): void => {
  const time = getTime();
  console.log(`${time} - ${req.method} ${req.originalUrl}`);
  next();
};
