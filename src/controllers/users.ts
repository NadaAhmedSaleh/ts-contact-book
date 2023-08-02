import express from "express";
import { createUser } from "../services/users";

const signUpApi = async (req: express.Request, res: express.Response) => {
  const { fullName, phoneNumber, email, password, confirmPassword } = req.body;
  const { status, ...data } = await createUser(
    fullName,
    phoneNumber,
    email,
    password,
    confirmPassword
  );
  res.status(status).send(data);
};

export { signUpApi };
