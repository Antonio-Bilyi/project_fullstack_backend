import createHttpError from 'http-errors';
import { UsersCollection } from '../db/models/users.js';
import { SessionsCollection } from '../db/models/session.js';

export const authenticate = async (req, res, next) => {
  if (!req.cookies.accessToken) {
    throw createHttpError.Unauthorized('Please provide access token');
  }

  const session = await SessionsCollection.findOne({
    accessToken: req.cookies.accessToken,
  });

  if (!session) throw createHttpError.Unauthorized('Session not found');

  if (session.accessTokenValidUntil < new Date())
    throw createHttpError.Unauthorized('Access token expired');

  const user = await UsersCollection.findById(session.userId);

  if (!user) throw createHttpError.NotFound('User not found');

  req.user = { id: user._id, name: user.name };

  next();
};
