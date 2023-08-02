import express from "express";
import { signInApi, signUpApi } from "../controllers/users";

const router = express.Router();

router.post("/signUp", signUpApi);
router.post("/signIn", signInApi);
//-----------------------------------------------------------------------------

export default router;
