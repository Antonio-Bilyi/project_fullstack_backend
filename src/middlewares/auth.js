import createHttpError from 'http-errors';
import { UsersCollection } from '../db/models/users.js';
import { SessionsCollection } from '../db/models/session.js';

/**
 * Middleware для аутентифікації користувача через JWT токен
 * 
 * Перевіряє наявність та валідність access token з cookies,
 * знаходить активну сесію користувача в БД та додає дані
 * користувача до req.user для використання в наступних middleware
 * 
 * @async
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @throws {401} Unauthorized - якщо токен відсутній, сесія не знайдена або прострочена
 * @throws {404} NotFound - якщо користувач не знайдений в БД
 * @returns {void} Додає user до req.user та викликає next()
 */
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
