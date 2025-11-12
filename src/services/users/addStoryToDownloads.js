import { UsersCollection } from '../../db/models/users.js';
import { StoriesCollection } from '../../db/models/stories.js';

export const addStoryToDownloads = async (
  userId,
  favouriteArticles,
  storyId,
  direction,
) => {
  const dataUpd = {
    favouriteArticles,
  };
  // Оновлюємо дані користувача
  const updUserResult = await UsersCollection.findOneAndUpdate(
    { _id: userId },
    dataUpd,
    {
      new: true,
      includeResultMetadata: true,
    },
  );

  let data = {
    user: {},
    story: {},
  };

  if (!updUserResult || !updUserResult.value) data.user = null;

  data.user = updUserResult.value;

  const updStoryResult = await StoriesCollection.findByIdAndUpdate(
    storyId,
    {
      $inc: { favoriteCount: direction },
    },
    {
      new: true,
      includeResultMetadata: true,
    },
  );

  if (!updStoryResult || !updUserResult.value) data.story = null;
  data.story = updStoryResult.value;

  return data;
};
