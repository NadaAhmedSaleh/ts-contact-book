import express from "express";
import { signInApi, signUpApi } from "../controllers/users";

const router = express.Router();

/**
 * @swagger
 * /api/signup:
 *   post:
 *     summary: User Sign Up
 *     description: Create a new user account.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       description: User sign up data.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *               phoneNumber:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               confirmPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: User successfully signed up.
 *       400:
 *         description: Bad request or validation error.
 */
router.post("/signUp", signUpApi);
//-----------------------------------------------------------------------------
/**
 * @swagger
 * /api/signIn:
 *   post:
 *     summary: User Sign In
 *     description: Sign in by email or phone number.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       description: User sign in data.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phoneNumber:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *                 required: true
 *     responses:
 *       200:
 *         description: User successfully signed in.
 *       400:
 *         description: Bad request or validation error.
 *       404:
 *         description: User not found.
 */
router.post("/signIn", signInApi);
//-----------------------------------------------------------------------------

export default router;
