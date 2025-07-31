import jwt, { JwtPayload } from "jsonwebtoken";
import { User } from "../SocketManager";
import { WebSocket } from "ws";

export interface userJWTClaims {
  userId: string;
  name: string;
  isGuest?: boolean;
}

const JWT_SECRET = process.env.JWT_SECRET || "12345";

export function extractUserAuth(token: string, ws: WebSocket): User {
  const decoded = jwt.verify(token, JWT_SECRET) as userJWTClaims;
  return new User(ws, decoded);
}
