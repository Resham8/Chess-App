import { Request, Response, Router } from "express";
import passport from "passport";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";
import { COOKIE_MAX_AGE } from "../config";

const authRouter: Router = Router();
const CLIENT_URL = process.env.AUTH_REDIRECT_URL;
const JWT_SECRET = process.env.JWT_SECRET || "keyboard cat";

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

authRouter.get("/guest", async (req: Request, res: Response) => {
  const bodyData = req.body;
  let guestUUID = `guest-${uuidv4()}`;
  //create the user

  const user = {
    id: "123",
    name: "resham",
    isGuest: true,
  };

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
  res.cookie("guest", token, { maxAge: COOKIE_MAX_AGE });
  res.json({ UserDetails, guestUUID });
});

authRouter.get("/refresh", async (req: Request, res: Response) => {
  if (req.user) {
    const user = req.user as UserDetails;
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
  "/google/callbacke",
  passport.authenticate("google", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);

export default authRouter;
