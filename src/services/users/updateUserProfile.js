import createHttpError from 'http-errors';
import { UsersCollection } from '../../db/models/users.js';

export const updateUserProfile = async (userId, payload) => {
  if (!userId) {
    throw createHttpError(400, 'User ID is required');
  }

  const allowedFields = ['name', 'avatarUrl', 'description'];
  const update = {};

  for (const field of allowedFields) {
    if (Object.prototype.hasOwnProperty.call(payload, field)) {
      const value = payload[field];

      if (typeof value === 'string') {
        const trimmedValue = value.trim();
        if (trimmedValue.length > 0) {
          update[field] = trimmedValue;
        }
      } else {
        update[field] = value;
      }
    }
  }

  if (Object.keys(update).length === 0) {
    throw createHttpError(400, 'No updatable fields provided');
  }

  const updatedUser = await UsersCollection.findByIdAndUpdate(
    userId,
    { $set: update },
    { new: true, runValidators: true },
  );

  if (!updatedUser) {
    throw createHttpError(404, 'User not found');
  }

  return updatedUser;
};
