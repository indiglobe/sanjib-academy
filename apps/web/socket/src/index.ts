import { SERVER_CONNECTION } from "@repo/utils/const/socket";
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();

const httpServer = createServer(app);

const io = new Server(httpServer, {});

io.on(SERVER_CONNECTION, (socket) => {
  console.log(socket.id);
});

httpServer.listen(4000);
