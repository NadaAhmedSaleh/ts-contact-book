import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import randtoken from "rand-token";
import mongoose from "mongoose";
import config from "config";
import messages from "../utils/messages";
import regExs from "../utils/regExs";
import isValidPhoneNumber from "../utils/isValidPhoneNumber";
import User from "../models/user";
//------------------------------------------------------------------------------
const validateAndHashPassword = async (
  password: string,
  confirmPassword: string
) => {
  // check that both password and confirmation password have the same value
  if (password !== confirmPassword) {
    return {
      status: 400,
      message: messages.users.notMatchingPasswordsErr,
    };
  }
  // check that entered password matches the password criteria
  if (!new RegExp(regExs.password).test(password)) {
    return {
      status: 400,
      message: messages.general.invalidErr(
        "Password",
        messages.regexErrs.password
      ),
    };
  }
  // if the entered password passed all the above checks return the hashed password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return {
    status: 200,
    hashedPassword,
  };
};
//------------------------------------------------------------------------------
const generateToken = (userId: mongoose.Types.ObjectId, email: string) => {
  return jwt.sign(
    {
      user: {
        email,
        id: userId,
      },
    },
    config.get("secrets.jwtPrivateKey"),
    { expiresIn: config.get("timers.tokenLifeSpan") }
  );
};

//------------------------------------------------------------------------------
const createUser = async (
  fullName: string,
  phoneNumber: string,
  email: string,
  password: string,
  confirmPassword: string
) => {
  try {
    if (!fullName || !phoneNumber || !email || !password || !confirmPassword) {
      return {
        status: 400,
        message: messages.general.missingFieldsErr,
      };
    }
    if (!isValidPhoneNumber(phoneNumber)) {
      return {
        status: 400,
        message: messages.general.invalidErr(
          "Phone number",
          messages.regexErrs.phoneNumber
        ),
      };
    }
    if (!new RegExp(regExs.email).test(email)) {
      return {
        status: 400,
        message: messages.general.invalidErr("Email", messages.regexErrs.email),
      };
    }
    const { status, message, hashedPassword } = await validateAndHashPassword(
      password,
      confirmPassword
    );
    if (status != 200) {
      return { status, message };
    }
    // check that no already registered user with this email or number
    let user;
    user = await User.findOne({ email }).lean();
    if (user) {
      return {
        status: 400,
        message: messages.users.alreadyExists("email", email),
      };
    }
    user = await User.findOne({ phoneNumber }).lean();
    if (user) {
      return {
        status: 400,
        message: messages.users.alreadyExists("phone number", phoneNumber),
      };
    }
    user = new User({ fullName, phoneNumber, email, password: hashedPassword });
    await user.save();
    return {
      status: 200,
      message: messages.users.signUpSuccess(fullName),
      accessToken: generateToken(user._id, email),
    };
  } catch (err) {
    return { status: 400, messages: err };
  }
};
//------------------------------------------------------------------------------
export { createUser };
