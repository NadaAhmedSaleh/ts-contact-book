import express from "express";
import usersRoutes from "../routes/users";

const app = express();
app.use(express.json()); // to parse request body

app.use("/auth", usersRoutes);

export default app;
