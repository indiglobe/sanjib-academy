import express from "express";
import { uploadRouter } from "./upload";
const router = express.Router();

router.all("/upload", uploadRouter);

export { router as RouterConfig };
