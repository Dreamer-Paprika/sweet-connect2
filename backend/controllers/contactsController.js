import { Contact } from "../models/contactsModel.js";
import { User } from '../models/usersModel.js';
// prettier-ignore
import { contactValidation, favoriteValidation } from "../validations/validation.js";
import { httpError } from "../helpers/httpError.js";
import 'dotenv/config';
const { ACCESS_TOKEN, PROJECT_ID } = process.env;
import TheAuthAPI from "theauthapi";

const theAuthAPI = new TheAuthAPI(ACCESS_TOKEN);

const retrieveKey = async (req, res) => {
  const { apiKey, apiKeyName, apiAccountId, apiCreationDate } = req.user;
  res.json({apiKey,apiKeyName,apiAccountId,apiCreationDate});
};

const createAPIkey = async (req, res, next) => {
  const { name, customMetaData, customAccountId } = req.body;
  try {
    //console.log(req.body);
    const key = await theAuthAPI.apiKeys.createKey({
      projectId: PROJECT_ID,
      customMetaData: { metadata_val: customMetaData },
      customAccountId: customAccountId,
      name: name,
    });
    console.log('Key created > ', key);
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, {
      apiKey: key.key,
      apiKeyName: key.name,
      apiAccountId: key.customAccountId,
      apiCreationDate: key.createdAt,
    });
    res.json(key);
  } catch (error) {
    console.log("Couldn't make the key ", error);
    next(error);
  }
};

const getAllContacts = async (req, res) => {
  const { _id } = req.user
  const contacts = await Contact.find({ owner: _id });
  res.json(contacts);

};


const addContact = async (req, res) => {
  // Preventing lack of necessary data for contacts (check validations folder)
  const { _id } = req.user;
  const { error } = contactValidation.validate(req.body);

  if (error) {
    throw httpError(400, "missing required fields");
  }

  const result = await Contact.create({ ...req.body, owner:_id });

  res.status(201).json(result);
};
const deleteContactById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndDelete(contactId);

  if (!result) {
    throw httpError(404);
  }

  res.json(contactId);
};


// prettier-ignore
export {
  getAllContacts,
  addContact,
  deleteContactById,
  retrieveKey,
  createAPIkey,
};                                        