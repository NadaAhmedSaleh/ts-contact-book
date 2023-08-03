import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import config from "config";
import messages from "../utils/messages";
import regExs from "../utils/regExs";
import isValidPhoneNumber from "../utils/isValidPhoneNumber";
import User from "../models/user";
//------------------------------------------------------------------------------
/**
 * - checks that:
 *   - password is same as confirm password
 *   - password follows the required password regex
 * @param password
 * @param confirmPassword
 * @returns - the hashed password to be saved in db
 */
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
        messages.fieldsNames.password,
        messages.fieldsErrs.password
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
/**
 * - generated jwt access token for user
 * @param userId
 * @param email
 * @returns - the jwt token
 */
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
/**
 * - creates a new user in db
 * @param fullName
 * @param phoneNumber
 * @param email
 * @param password
 * @param confirmPassword
 * @returns - success/err message, status code, and access token incase of success
 *
 */
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
          messages.fieldsNames.phoneNumber,
          messages.fieldsErrs.phoneNumber
        ),
      };
    }
    if (!new RegExp(regExs.email).test(email)) {
      return {
        status: 400,
        message: messages.general.invalidErr(
          messages.fieldsNames.email,
          messages.fieldsErrs.email
        ),
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
        message: messages.users.alreadyExists(
          messages.fieldsNames.email,
          email
        ),
      };
    }
    user = await User.findOne({ phoneNumber }).lean();
    if (user) {
      return {
        status: 400,
        message: messages.users.alreadyExists(
          messages.fieldsNames.phoneNumber,
          phoneNumber
        ),
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
/**
 * - sign in using email or phoneNumber
 * @param phoneNumber - either phoneNumber or email should be given
 * @param email
 * @param password
 * @returns - status code, err message incase of failure and access token incase success
 */
const signIn = async (phoneNumber: string, email: string, password: string) => {
  if (!password || (!phoneNumber && !email)) {
    return { status: 400, message: messages.general.missingFieldsErr };
  }
  const user = await User.findOne(
    phoneNumber ? { phoneNumber } : { email } // sign in using email or phone
  ).lean();
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return {
      status: 404,
      message: messages.users.logInErr(
        phoneNumber
          ? messages.fieldsNames.phoneNumber
          : messages.fieldsNames.email
      ),
    };
  }
  return {
    status: 200,
    message: messages.users.logInSuccess(user.fullName),
    accessToken: generateToken(user._id, user.email),
  };
};
//------------------------------------------------------------------------------
export { generateToken, createUser, signIn };
