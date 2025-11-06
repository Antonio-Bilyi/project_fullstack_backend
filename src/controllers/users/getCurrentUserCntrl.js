import { getCurrentUser } from '../../services/users/getCurrentUser.js';
import createHttpError from 'http-errors';

export const getCurrentUserCntrl = async (req, res) => {
  // TODO: After adding authenticate middleware, req.user._id will be available automatically
  // For now, userId can be passed via req.body or req.query for testing purposes
  const userId = req.query.userId;

  if (!userId) {
    throw createHttpError(401, 'Unauthorized');
  }

  const user = await getCurrentUser(userId);

  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  res.status(200).json({
    username: user.name,
    email: user.email,
    avatar: user.avatarUrl,
  });
};
