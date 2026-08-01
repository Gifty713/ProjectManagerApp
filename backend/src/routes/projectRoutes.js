import { Router } from "express";
import { createProject, getProjects, deleteProject } from "../controllers/projectControllers.js";
import { authToken } from "../middleware/jsonAuth.js";

const projectRoute = Router();

// routes for projects
projectRoute.route("/createproject/:id").post(authToken, createProject);
projectRoute.route("/getprojects/:id").get(authToken, getProjects);
projectRoute.route("/deleteproject/:id").delete(authToken, deleteProject);

export default projectRoute;