import { Router } from "express";
import { register, login, refreshToken } from "../controllers/authControllers.js";
const authRoute = Router();

authRoute.route("/register").post(register);
authRoute.route("/login").post(login);
authRoute.route("/refreshtoken").post(refreshToken);

export default authRoute;