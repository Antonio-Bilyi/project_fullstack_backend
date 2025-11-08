import { getCurrentUser } from '../../services/users/getCurrentUser.js';
import createHttpError from 'http-errors';

export const getCurrentUserCntrl = async (req, res) => {
  const userId = req.user.id;

  const user = await getCurrentUser(userId);

  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  res.json({
    status: 200,
    message: "Successful got current user",
    data: {
      username: user.name,
      avatar: user.avatarUrl,
      email: user.email
    }
  });
};
