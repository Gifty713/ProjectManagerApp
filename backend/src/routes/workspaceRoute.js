import {Router} from "express";
import { createWorkspace, getWorkspaces, particularWorkspace } from "../controllers/workspaceControllers.js";
import { authToken } from "../middleware/jsonAuth.js";

const workspaceRoute = Router();

workspaceRoute.route("/createworkspace").post(authToken, createWorkspace);
workspaceRoute.route("/getworkspaces").get(authToken, getWorkspaces);
workspaceRoute.route("/getparticularworkspace/:id").get(authToken, particularWorkspace);

export default workspaceRoute;