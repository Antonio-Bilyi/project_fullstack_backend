import { StoriesCollection } from '../../db/models/stories.js';

export const updateStory = async (storyId, payload, userId, options = {}) => {
  const result = await StoriesCollection.findOneAndUpdate(
    {
      _id: storyId,
      ownerId: userId,
    },
    payload,
    {
      new: true,
      includeResultMetadata: true,
      ...options,
    },
  );
  if (!result || !result.value) return null;

  return {
    story: result.value,
    isNew: Boolean(result?.lastErrorObject?.upserted),
  };
};
