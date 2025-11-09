import { UsersCollection } from '../../db/models/users.js';
import { StoriesCollection } from '../../db/models/stories.js';

export const getUserById = async (userId) => {
  const user = await UsersCollection.findById(userId)
    .select('name avatarUrl description')
    .lean();

  if (!user) return null;
  const stories = await StoriesCollection.find({ ownerId: userId })
    .select('title article img date')
    .sort({ date: -1 })
    .lean();

  return {
    _id: user._id,
    name: user.name,
    avatarUrl: user.avatarUrl,
    description: user.description || '',
    articlesAmount: stories.length,
    stories,
  };
};
