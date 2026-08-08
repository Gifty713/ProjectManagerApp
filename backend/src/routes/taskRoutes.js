import { Router } from "express";
import { createTask, editTask, deleteTask, changeStatus, getTasks } from "../controllers/taskControllers.js";
const taskRoute = Router();

taskRoute.route("/createtask/:project_id").post(createTask);
taskRoute.route("/edittask/:task_id").patch(editTask);
taskRoute.route("/deletetask/:task_id").delete(deleteTask);
taskRoute.route("/changestatus/:project_id").post(changeStatus);
taskRoute.route("/gettasks/:project_id/:status").get(getTasks);

export default taskRoute;