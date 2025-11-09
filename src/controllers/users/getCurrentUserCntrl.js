import { getCurrentUser } from '../../services/users/getCurrentUser.js';

export const getCurrentUserCntrl = async (req, res) => {
  if (!req.user?._id) {
    res.status(401).json({
      status: 401,
      message: 'Unauthorized',
    });
    return;
  }

  const userId = req.user._id;

  const user = await getCurrentUser(userId);

  if (!user) {
    res.status(404).json({
      status: 404,
      message: 'User not found',
    });
    return;
  }

  res.json({
    status: 200,
    message: 'Successfully got current user',
    data: {
      id: String(user._id),
      username: user.name,
      avatar: user.avatarUrl,
      email: user.email,
      description: user.description,
    },
  });
};
