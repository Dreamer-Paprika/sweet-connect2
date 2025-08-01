import jwt from 'jsonwebtoken';
import { User } from '../models/usersModel.js';
import { httpError } from '../helpers/httpError.js';
import 'dotenv/config';
const { SECRET_KEY, ACCESS_TOKEN } = process.env;
import TheAuthAPI from "theauthapi";
const theAuthAPI = new TheAuthAPI(ACCESS_TOKEN);

const contactsKey = async (req, _res, next) => {
  const { apiKey } = req.params;
  const { authorization = '' } = req.headers;
  const [bearer, token] = authorization.split(' ');

  if (bearer !== 'Bearer') {
    next(httpError(401, 'Not authorized'));
  }

  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);

    if (!user || user.token !== token || !user.token) {
      next(httpError(401, 'Not authorized'));
    }

    req.user = user;

    const isValidKey = await theAuthAPI.apiKeys.isValidKey(apiKey);
    if (isValidKey) {
      console.log('The API key is valid!');
    } else {
      console.log('Invalid API key!');
      next(httpError(401, 'Not authorized'));
    }
    next();
  } catch {
    next(httpError(401, 'Not authorized'));
  }
};

export { contactsKey };
