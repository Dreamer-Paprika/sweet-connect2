import express from "express";
import { ctrlWrapper } from "../../helpers/ctrlWrapper.js";
// prettier-ignore
import {
  addContact,
  deleteContactById,
  getAllContacts,
  retrieveKey,
  createAPIkey,
} from '../../controllers/contactsController.js';
import { authenticateToken } from "../../middlewares/authenticateToken.js";
import { contactsKey } from '../../middlewares/contactsKey.js';

const router = express.Router();

     
router.get("/", authenticateToken, ctrlWrapper(getAllContacts));            

router.post('/key', authenticateToken, createAPIkey);

router.get('/retrieve', authenticateToken, ctrlWrapper(retrieveKey));

router.post("/:apiKey", contactsKey, ctrlWrapper(addContact)); /*The contactsKey function validates the API Key sent from the Frontend,
if the API Key is valid access is granted to the addContact function*/

router.delete('/:contactId/:apiKey',contactsKey,ctrlWrapper(deleteContactById)); /*The contactsKey function validates the API Key sent from the Frontend,
if the API Key is valid access is granted to the deleteContactById function*/



export { router };
