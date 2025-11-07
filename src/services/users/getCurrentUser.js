import { UsersCollection } from '../../db/models/users.js';

export const getCurrentUser = async (userId) => {
  return UsersCollection.findById(userId);
};
