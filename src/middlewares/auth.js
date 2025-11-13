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

  const isAccessTokenExpired = new Date() > new Date(session.accessTokenValidUntil);
  if (isAccessTokenExpired) {
    throw createHttpError.Unauthorized('Access token expired');
  }
  
  const user = await UsersCollection.findById(session.userId);

  if (!user) throw createHttpError.NotFound('User not found');

  req.user = user;

  next();
};