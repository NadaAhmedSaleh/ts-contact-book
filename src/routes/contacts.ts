import express from "express";
import {
  addContactApi,
  deleteContactApi,
  viewContactsApi,
  viewContactsByIdApi,
} from "../controllers/contacts";

const router = express.Router();

/**
 * @swagger
 * /api/contacts:
 *   post:
 *     summary: Add a new Contact
 *     description: Add a new contact for by an authenticated user.
 *     tags:
 *       - Contacts
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Contact data to be added.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               phoneNumber:
 *                 type: string
 *               email:
 *                 type: string
 *               birthDate:
 *                 type: string
 *                 format: YYYY-MM-DD
 *     responses:
 *       200:
 *         description: Contact added successfully.
 *       400:
 *         description: Bad request or validation error.
 *       401:
 *         description: Unauthorized - User not authenticated.
 */
router.post("/", addContactApi);
//-----------------------------------------------------------------------------
/**
 * @swagger
 * /api/contacts:
 *   get:
 *     summary: View Contacts
 *     description: Retrieve contacts for an authenticated user.
 *     tags:
 *       - Contacts
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Contacts retrieved successfully.
 *         content:
 *           application/json:
 *                  type: array
 *                  items:
 *                    type: object
 *       400:
 *         description: Bad request or database error.
 *       401:
 *         description: Unauthorized - User not authenticated.
 */
router.get("/", viewContactsApi);
//-----------------------------------------------------------------------------
/**
 * @swagger
 * /api/contacts/{contactId}:
 *   get:
 *     summary: View Contact by ID
 *     description: Retrieve a contact by its ID for an authenticated user.
 *     tags:
 *       - Contacts
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: contactId
 *         description: ID of the contact to retrieve.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Contact retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       400:
 *         description: Bad request or database error.
 *       401:
 *         description: Unauthorized - User not authenticated.
 *       403:
 *         description: Forbidden - User does not have access to the contact.
 *       404:
 *         description: Contact not found.
 */
router.get("/:contactId", viewContactsByIdApi);
//-----------------------------------------------------------------------------
/**
 * @swagger
 * /api/contacts/{contactId}:
 *   delete:
 *     summary: Delete Contact by ID
 *     description: Delete a contact by its ID for an authenticated user.
 *     tags:
 *       - Contacts
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: contactId
 *         description: ID of the contact to delete.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Contact deleted successfully.
 *       400:
 *         description: Bad request or database error.
 *       401:
 *         description: Unauthorized - User not authenticated.
 *       403:
 *         description: Forbidden - User does not have access to delete the contact.
 *       404:
 *         description: Contact not found.
 */
router.delete("/:contactId", deleteContactApi);
//-----------------------------------------------------------------------------

export default router;
