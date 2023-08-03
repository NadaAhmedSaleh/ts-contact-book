import mongoose from "mongoose";

import { createUser } from "../../services/users";
import messages from "../../utils/messages";

import isValidPhoneNumber from "../../utils/isValidPhoneNumber";
import User from "../../models/user";

// Mock the isValidPhoneNumber function
jest.mock("../../utils/isValidPhoneNumber");

describe("Users Services", () => {
  // Close the database connection after all tests have finished
  afterAll(async () => {
    await User.deleteMany({});
    await mongoose.connection.close();
  });
  beforeAll(async () => {
    await mongoose.connect("mongodb://localhost:27017/test");
    await User.deleteMany({});
    (
      isValidPhoneNumber as jest.MockedFunction<typeof isValidPhoneNumber>
    ).mockReturnValue(true);
  });
  describe("createUser", () => {
    describe("should return 400 and err message", () => {
      it("missing fields", async () => {
        const res = await createUser("", "", "", "", "");
        expect(res.status).toBe(400);
        expect(res.message).toBe(messages.general.missingFieldsErr);
      });
      it("invalid email", async () => {
        const res = await createUser(
          "full name",
          "+201026661833",
          "testdomain.com",
          "password1",
          "password1"
        );
        expect(res.status).toBe(400);
        expect(res.message).toBe(
          messages.general.invalidErr(
            messages.fieldsNames.email,
            messages.fieldsErrs.email
          )
        );
      });
      it("difference between password and confirmation password", async () => {
        const res = await createUser(
          "full name",
          "+201026661833",
          "test@domain.com",
          "password1",
          "password2"
        );
        expect(res.status).toBe(400);
        expect(res.message).toBe(messages.users.notMatchingPasswordsErr);
      });
      it("invalid password", async () => {
        const res = await createUser(
          "full name",
          "+201026661833",
          "test@domain.com",
          "pass",
          "pass"
        );
        expect(res.status).toBe(400);
        expect(res.message).toBe(
          messages.general.invalidErr(
            messages.fieldsNames.password,
            messages.fieldsErrs.password
          )
        );
      });
    });
  });
});
