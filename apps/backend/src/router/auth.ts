import { Request, Response, Router } from "express";
import passport from "passport";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";
import { COOKIE_MAX_AGE } from "../config";
import { prismaClient } from "@repo/db/client";
import dotenv from "dotenv";
dotenv.config();

const authRouter: Router = Router();
const CLIENT_URL = process.env.AUTH_REDIRECT_URL;
const JWT_SECRET = process.env.JWT_SECRET || "";

interface userJwtClaims {
  userId: string;
  name: string;
  isGuest?: boolean;
}

interface UserDetails {
  id: string;
  token?: string;
  name: string;
  isGuest?: boolean;
}

authRouter.post("/guest", async (req: Request, res: Response) => {
  const bodyData = req.body;
  let guestUUID = `guest-${uuidv4()}`;

  const user = await prismaClient.user.create({
    data: {
      username: guestUUID,
      email: guestUUID + "@chess100x.com",
      name: bodyData.name || guestUUID,
      provider: "GUEST",
    },
  });

  const token = jwt.sign(
    { userId: user.id, name: user.name, isGuest: true },
    JWT_SECRET
  );

  const UserDetails: UserDetails = {
    id: user.id,
    name: user.name!,
    token: token,
    isGuest: true,
  };
  res.cookie("guest", token, { maxAge: COOKIE_MAX_AGE, httpOnly: true, });
  res.json(UserDetails);
});

authRouter.get("/refresh", async (req: Request, res: Response) => {
  console.log("Cookies:", req.cookies);
  console.log("User:", req.user);
  if (req.user) {
    const user = req.user as UserDetails;

    const userDb = await prismaClient.user.findFirst({
      where: {
        id: user.id,
      },
    });

    const token = jwt.sign({ userId: user.id, name: userDb?.name }, JWT_SECRET);
    res.json({
      token,
      id: user.id,
      name: userDb?.name,
    });
  } else if (req.cookies && req.cookies.guest) {
    const decoded = jwt.verify(req.cookies.guest, JWT_SECRET) as userJwtClaims;
    const token = jwt.sign(
      { userId: decoded.userId, name: decoded.name, isGuest: true },
      JWT_SECRET
    );
    let User: UserDetails = {
      id: decoded.userId,
      name: decoded.name,
      token: token,
      isGuest: true,
    };

    res.cookie("guest", token, { maxAge: COOKIE_MAX_AGE });
    res.json(User);
  } else {
    res.status(401).json({ success: false, message: "Unauthorized" });
  }
});

authRouter.get("/login/failed", async (req: Request, res: Response) => {
  res.status(401).json({
    success: false,
    message: "failure",
  });
});

authRouter.get("/logout", async (req: Request, res: Response) => {
  res.clearCookie("guest");
  req.logout((err) => {
    if (err) {
      console.error("Error logging out:", err);
      res.status(500).json({ error: "Failed to log out" });
    } else {
      res.clearCookie("jwt");
      res.redirect("http://localhost:5173/");
    }
  });
});

authRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

authRouter.get(
  '/google/callback',
  passport.authenticate('google', {
    successRedirect: CLIENT_URL,
    failureRedirect: '/login/failed',
  }),
);

export default authRouter;
