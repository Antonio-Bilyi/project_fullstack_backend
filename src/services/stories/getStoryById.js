import { StoriesCollection } from '../../db/models/stories.js';

export const getStoryById = async (storyId) => {
  return StoriesCollection.findById(storyId)
    .populate('category')
    .populate({ path: 'ownerId', select: '_id name avatarUrl' });
};
