import jwt, { JwtPayload } from "jsonwebtoken";
import { User } from "../SocketManager";
import { WebSocket } from "ws";
import dotenv from "dotenv";
dotenv.config();

export interface userJWTClaims {
  userId: string;
  name: string;
  isGuest?: boolean;
}

const JWT_SECRET = process.env.JWT_SECRET || "";

export function extractUserAuth(token: string, ws: WebSocket): User {
  console.log(`from ws: ${JWT_SECRET}`)
  const decoded = jwt.verify(token, JWT_SECRET) as userJWTClaims;
  return new User(ws, decoded);
}
