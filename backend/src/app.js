import express from "express";
import authRoute from "./routes/AuthRoutes.js";
import workspaceRoute from "./routes/workspaceRoute.js";

const app = express();

app.use(express.json());

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/workspace", workspaceRoute);

export default app;