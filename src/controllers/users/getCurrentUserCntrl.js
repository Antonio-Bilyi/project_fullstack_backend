import { getCurrentUser } from '../../services/users/getCurrentUser.js';

export const getCurrentUserCntrl = async (req, res) => {
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
