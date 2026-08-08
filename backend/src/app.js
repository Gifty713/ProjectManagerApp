import express from "express";
import authRoute from "./routes/AuthRoutes.js";
import workspaceRoute from "./routes/workspaceRoutes.js";
import projectRoute from "./routes/projectRoutes.js";
import memberRoute from "./routes/memberRoutes.js";
import taskRoute from "./routes/taskRoutes.js";

const app = express();

app.use(express.json());

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/workspace", workspaceRoute);
app.use("/api/v1/project", projectRoute);
app.use("/api/v1/members", memberRoute);
app.use("/api/v1/tasks", taskRoute);

export default app;