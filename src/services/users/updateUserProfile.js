import createHttpError from 'http-errors';
import bcrypt from 'bcrypt';
import { UsersCollection } from '../../db/models/users.js';

export const updateUserProfile = async (userId, payload) => {
  const updates = {};

  if (payload.name !== undefined) {
    updates.name = payload.name;
  }

  if (payload.email !== undefined) {
    const existing = await UsersCollection.findOne({ email: payload.email });
    if (existing && String(existing._id) !== String(userId)) {
      throw createHttpError(409, 'Email in use');
    }
    updates.email = payload.email;
  }

  if (payload.password !== undefined) {
    updates.password = await bcrypt.hash(payload.password, 10);
  }

  const updatedUser = await UsersCollection.findByIdAndUpdate(userId, updates, {
    new: true,
  });

  if (!updatedUser) {
    throw createHttpError(404, 'User not found');
  }

  return updatedUser;
};
