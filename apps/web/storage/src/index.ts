import express from "express";
import { toNodeHandler } from "better-auth/node";
import { auth } from "@/lib/auth/config";
import { loggerMiddleware } from "./middlewares/req-logger.middleware";
import { RouterConfig } from "./routes/__routes";

const app = express();
const PORT = 4000;

app.use(loggerMiddleware);

app.all("/api/auth/*splat", toNodeHandler(auth)); // For BetterAuth in ExpressJS v5

/**
 * Mount express json middleware after Better Auth handler
 * or only apply it to routes that don't interact with Better Auth
 */
app.use(express.json());

app.use(RouterConfig);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
