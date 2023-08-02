import express from "express";
import {
  addContactApi,
  deleteContactApi,
  viewContactsApi,
  viewContactsByIdApi,
} from "../controllers/contacts";

const router = express.Router();

router.post("/", addContactApi);
//-----------------------------------------------------------------------------
router.get("/", viewContactsApi);
//-----------------------------------------------------------------------------
router.get("/:contactId", viewContactsByIdApi);
//-----------------------------------------------------------------------------
router.delete("/:contactId", deleteContactApi);
//-----------------------------------------------------------------------------

export default router;
