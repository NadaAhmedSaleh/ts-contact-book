import express from "express";
import { signUpApi } from "../controllers/users";

const router = express.Router();

router.post("/signUp", signUpApi);
//-----------------------------------------------------------------------------

export default router;
