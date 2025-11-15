import createHttpError from 'http-errors';
import { updateUserProfile } from '../../services/users/updateUserProfile.js';

export const updateUserProfileCntrl = async (req, res) => {
  const userId = req.user?._id;

  if (!userId) {
    throw createHttpError(401, 'User not authenticated');
  }

  const updatedUser = await updateUserProfile(userId, req.body);

  res.json({
    status: 200,
    message: 'Successfully updated user profile',
    data: {
      name: updatedUser.name,
      avatarUrl: updatedUser.avatarUrl,
      email: updatedUser.email,
      description: updatedUser.description,
    },
  });
};
