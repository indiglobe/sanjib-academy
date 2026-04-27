import express from "express";
import { uploadRouter } from "./upload";
import { authMiddleware } from "@/middlewares/auth.middleware";

const router = express.Router();

router.all("/upload", authMiddleware, uploadRouter);

export { router as RouterConfig };
