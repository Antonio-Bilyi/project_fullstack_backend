import createHttpError from 'http-errors';
import { addStoryToDownloads } from '../../services/users/addStoryToDownloads.js';
import { getCurrentUser } from '../../services/users/getCurrentUser.js';
import { getStoryById } from '../../services/stories/getStoryById.js';

export const addStoryToDownloadCntrl = async (req, res) => {
  const userId = req.user._id;

  const user = await getCurrentUser(userId);
  if (!user) {
    throw createHttpError(404, 'Such user not found');
  }

  const story = await getStoryById(req.body.storyId);
  if (!story) {
    throw createHttpError(404, 'Such story not found');
  }

  if (user.favouriteArticles.indexOf(req.body.storyId) !== -1) {
    throw createHttpError(400, 'Such story already in downloads');
  }

  user.favouriteArticles.push(req.body.storyId);

  const data = await addStoryToDownloads(
    userId,
    user.favouriteArticles,
    story._id,
    1,
  );

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
    message: 'Story successfully added to downloads!',
    data: data,
  });
};
