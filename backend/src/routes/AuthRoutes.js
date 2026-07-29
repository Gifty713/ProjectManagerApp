import { Router } from "express";
import { register, login } from "../controllers/authControllers.js";
const authRoute = Router();

authRoute.route("/register").post(register);
authRoute.route("/login").post(login);

export default authRoute;