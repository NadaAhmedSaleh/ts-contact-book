// contacts.test.ts

import mongoose from "mongoose";
import {
  addContact,
  getUserContacts,
  getContactById,
  deleteContactById,
} from "../../services/contacts";

import Contact from "../../models/contact";
import messages from "../../utils/messages";

jest.mock("../../models/contact");

describe("Contacts Service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("addContact", () => {
    describe("should return 400 and err message", () => {
      it("missing fields", async () => {
        const res = await addContact(
          new mongoose.Types.ObjectId(),
          undefined,
          "",
          "",
          "",
          ""
        );
        expect(res.status).toBe(400);
        expect(res.message).toBe(messages.general.missingFieldsErr);
      });
    });
  });
});
