import express from "express";
import usersRoutes from "../routes/users";
import contactsRoutes from "../routes/contacts";
import auth from "../middleWares/auth";

const app = express();
app.use(express.json()); // to parse request body

app.use("/auth", usersRoutes);
app.use("/contacts", auth, contactsRoutes);

export default app;
