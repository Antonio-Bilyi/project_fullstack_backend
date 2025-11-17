import createHttpError from 'http-errors';
import getUserById from '../../services/users/getUserById.js';
import { getMyStories } from '../../services/stories/getMyStories.js';
import parsePaginationParams from '../../utils/parsePaginationParams.js';
import parseStoryTypeParams from '../../utils/parseStoryTypeParams.js';
import { TYPE_STORIES } from '../../constants/index.js';

export default async function getMeByIdCntrl(req, res, next) {
  const { userId } = req.params;
  const { page, perPage } = parsePaginationParams(req.query);
  const { storiesType } = parseStoryTypeParams(req.query);

  const user = await getUserById(userId);

  if (!user) {
    next(createHttpError(404, 'User nor found'));
    return;
  }

  const isTheSameUser = user._id.equals(req.user._id);

  if (!isTheSameUser) {
    next(createHttpError(403, 'Access forbidden.'));
  }

  let filter = {};
  let filterAll = {};

  if (storiesType === TYPE_STORIES.OWN) {
    filter = { ownerId: user._id };
  }

  if (storiesType === TYPE_STORIES.SVD) {
    filterAll = { _id: user.favouriteArticles };
  }

  const response = await getMyStories({ page, perPage, filter, filterAll });

  if (response?.totalItems === 0) {
    res.json({
      status: 200,
      message:
        storiesType === TYPE_STORIES.OWN
          ? `You hasn't own stories yet.`
          : "You hasn't saved stories yet.",
      data: {
        user,
        ...response,
      },
    });
  }

  const data = {
    user: user,
    ...response,
  };

  res.json({
    status: 200,
    message: `Successfully found user: ${user.name} with stories!`,
    data: data,
  });
}
