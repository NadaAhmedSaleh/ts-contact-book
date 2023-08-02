import express from "express";

const app = express();
app.use(express.json()); // to parse request body

export default app;
