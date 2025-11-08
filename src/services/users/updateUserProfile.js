import createHttpError from 'http-errors';
import { UsersCollection } from '../../db/models/users.js';

export const updateUserProfile = async (userId, payload) => {
  const allowedFields = ['name', 'avatarUrl', 'description'];
  const update = {};

  for (const field of allowedFields) {
    if (Object.prototype.hasOwnProperty.call(payload, field)) {
      update[field] = payload[field];
    }
  }

  if (Object.keys(update).length === 0) {
    throw createHttpError(400, 'No updatable fields provided');
  }

  const updatedUser = await UsersCollection.findByIdAndUpdate(
    userId,
    { $set: update },
    { new: true },
  );

  if (!updatedUser) {
    throw createHttpError(404, 'User not found');
  }

  return updatedUser;
};
