import { auth } from "@/lib/auth/config";
import { fromNodeHeaders } from "better-auth/node";
import express from "express";

const router = express.Router();

/**
 * route `/upload`
 */
router.get("/", async (req, res) => {
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers),
  });

  return res.json(session);
});

export { router as uploadRouter };
