import createHttpError from 'http-errors';
import { getStoryById } from '../../services/stories/getStoryById.js';

export default async function getStoryByIdCntrl(req, res, next) {
  const { storyId } = req.params;

  const story = await getStoryById(storyId);

  if (!story) {
    next(createHttpError(404, 'Story not found'));
    return;
  }

  return res.json({
    status: 200,
    message: `Story successfully found.`,
    data: story,
  });
}
