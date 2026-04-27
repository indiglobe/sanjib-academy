import { auth } from "@/lib/auth/config";
import { AuthError } from "@/lib/error";
import { fromNodeHeaders } from "better-auth/node";
import { Request, Response, NextFunction } from "express";

/**
 * A simple auth middleware to validate user.
 */
export const authMiddleware = async (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers),
  });

  if (!session) {
    const error = new AuthError();
    next(error);
  }

  next();
};
