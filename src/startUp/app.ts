import express from "express";
import usersRoutes from "../routes/users";
import contactsRoutes from "../routes/contacts";
import auth from "../middleWares/auth";
import { serveSwaggerUI, setupSwaggerUI } from "../../swagger";
const app = express();
app.use(express.json()); // to parse request body

app.use("/api-docs", serveSwaggerUI, setupSwaggerUI); // API-Docs end point

app.use("/auth", usersRoutes);
app.use("/contacts", auth, contactsRoutes);

export default app;
