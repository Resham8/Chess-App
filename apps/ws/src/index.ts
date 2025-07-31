import { WebSocketServer } from "ws";
import { GameManager } from "./GameManager";
import { extractUserAuth } from "./auth";

const wss = new WebSocketServer({ port: 8080 });

const gameManger = new GameManager();

wss.on("connection", function connection(ws, req) {
  const url = req.url;
  if (!url) {
    return;
  }

  const queryParams = new URLSearchParams(url.split("?")[1]);
  const token = queryParams.get("token");
  const user = extractUserAuth(token as string, ws);
  gameManger.addUser(user);

  ws.on("close", () => {
    gameManger.removeUser(ws);
  });
});
