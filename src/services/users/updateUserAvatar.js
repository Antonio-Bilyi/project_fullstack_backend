import { UsersCollection } from '../../db/models/users.js';
import uploadToCloudinary from '../../utils/uploadToCloudinary.js';
import fs from 'node:fs/promises';

export const updateUserAvatar = async (userId, avatarFile) => {
  let avatarUrl;

  const uploadResult = await uploadToCloudinary(avatarFile.path);
  avatarUrl = uploadResult.secure_url;
  await fs.unlink(avatarFile.path);

  const updatedUser = await UsersCollection.findByIdAndUpdate(
    userId,
    { avatarURL: avatarUrl },
    { new: true },
  );

  return updatedUser;
};
