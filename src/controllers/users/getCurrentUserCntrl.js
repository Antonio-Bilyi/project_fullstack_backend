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

  const currentUser = await getCurrentUser(userId);

  if (!currentUser) {
    res.status(404).json({
      status: 404,
      message: 'User not found',
    });
    return;
  }

  res.json({
    status: 200,
    message: 'Successfully got current user',
    data: currentUser,
  });
};
