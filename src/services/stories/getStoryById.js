import { StoriesCollection } from '../../db/models/stories.js';

export const getStoryById = async (storyId) => {
  return StoriesCollection.findById(storyId);
};
