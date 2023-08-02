import express from "express";
import {
  addContact,
  deleteContactById,
  getContactById,
  getUserContacts,
} from "../services/contacts";
import { AuthenticatedRequest } from "../middleWares/auth";

const addContactApi = async (
  req: AuthenticatedRequest,
  res: express.Response
) => {
  const { firstName, lastName, phoneNumber, email, birthDate } = req.body;
  const { status, ...data } = await addContact(
    req.user.id,
    firstName,
    lastName,
    phoneNumber,
    email,
    birthDate
  );
  res.status(status).send(data);
};
//------------------------------------------------------------------------------
const viewContactsApi = async (
  req: AuthenticatedRequest,
  res: express.Response
) => {
  const { status, ...data } = await getUserContacts(req.user.id);
  res.status(status).send(data);
};
//------------------------------------------------------------------------------
const viewContactsByIdApi = async (
  req: AuthenticatedRequest,
  res: express.Response
) => {
  const { contactId } = req.params;
  const { status, ...data } = await getContactById(req.user.id, contactId);
  res.status(status).send(data);
};
//------------------------------------------------------------------------------
const deleteContactApi = async (
  req: AuthenticatedRequest,
  res: express.Response
) => {
  const { contactId } = req.params;
  const { status, ...data } = await deleteContactById(req.user.id, contactId);
  res.status(status).send(data);
};

export {
  addContactApi,
  viewContactsApi,
  viewContactsByIdApi,
  deleteContactApi,
};
