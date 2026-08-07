import express from "express";
import authRoute from "./routes/AuthRoutes.js";
import workspaceRoute from "./routes/workspaceRoutes.js";
import projectRoute from "./routes/projectRoutes.js";
import memberRoute from "./routes/memberRoutes.js";

const app = express();

app.use(express.json());

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/workspace", workspaceRoute);
app.use("/api/v1/project", projectRoute);
app.use("/api/v1/members", memberRoute);

export default app;