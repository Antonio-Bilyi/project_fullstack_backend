import createHttpError from 'http-errors';
import { removeStoryFromDownloads } from '../../services/users/removeStoryFromDownloads.js';
import { getCurrentUser } from '../../services/users/getCurrentUser.js';
import { getStoryById } from '../../services/stories/getStoryById.js';

export const removeStoryFromDownloadCntrl = async (req, res) => {
  const userId = req.user._id;

  const user = await getCurrentUser(userId);
  if (!user) {
    throw createHttpError(404, 'Such user not found');
  }

  const story = await getStoryById(req.body.storyId);
  if (!story) {
    throw createHttpError(404, 'Such story not found');
  }

  if (user.favouriteArticles.indexOf(req.body.storyId) === -1) {
    throw createHttpError(400, 'Such story absent in downloads');
  }

  //це для того , щоб каунтер не уходив в мінус.
  let num = 0;

  if (story.favoriteCount >= 0) {
    num = -1;
  }

  const data = await removeStoryFromDownloads(userId, story._id, num);

  if (!data) {
    res.json({
      status: 204,
      message:
        "Something went wrong. Data cann't be returned fully or particially.",
    });
    return;
  }

  res.json({
    status: 200,
    message: 'Story successfully removed from downloads!',
    data: data,
  });
};
