import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRouter from "./router/auth";
import cookieParser from "cookie-parser";
import session from "express-session";
import { COOKIE_MAX_AGE } from "./config";
import passport from "passport";
import { initPassport } from "./passport";
dotenv.config();

const app = express();
app.use(express.json());

const allowedOrigin = process.env.ALLOWED_HOSTS;
app.use(
  cors({
    origin: allowedOrigin,
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(
  session({
    secret: "keyboard dog",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, maxAge: COOKIE_MAX_AGE },
  })
);
initPassport();

app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", authRouter);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
