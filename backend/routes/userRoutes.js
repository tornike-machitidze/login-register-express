import { Router } from "express";
import auth from "../middleware/auth.js";

import {
  getUsers,
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/userControllers.js";

const userRouter = Router();

userRouter.route("/users").post(registerUser);
userRouter.route("/users/me").get(auth, getUsers);
userRouter.route("/users/login").post(loginUser);
userRouter.route("/users/logout").post(auth, logoutUser);

export default userRouter;
