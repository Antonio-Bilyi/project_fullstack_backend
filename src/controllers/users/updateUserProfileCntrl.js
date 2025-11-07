import { updateUserProfile } from '../../services/users/updateUserProfile.js';

export const updateUserProfileCntrl = async (req, res) => {
  const userId = req.user?.id;

  const updated = await updateUserProfile(userId, req.body);

  res.json({
    status: 200,
    message: 'Successfully updated user profile',
    data: updated,
  });
};
