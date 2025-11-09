import createHttpError from 'http-errors';
import { updateUserAvatar } from '../../services/users/updateUserAvatar.js';

export const UpdateUserAvatarCntrl = async (req, res, next) => {
  try {
    const avatar = req.file;

    if (!avatar) {
      throw createHttpError(400, 'Avatar file is required');
    }

    const updatedUser = await updateUserAvatar(req.user._id, avatar);

    if (!updatedUser) {
      throw createHttpError(404, 'User not found');
    }

    res.json({
      status: 200,
      message: 'Avatar updated successfully',
      data: { avatarURL: updatedUser.avatarURL },
    });
  } catch (error) {
    next(error);
  }
};
