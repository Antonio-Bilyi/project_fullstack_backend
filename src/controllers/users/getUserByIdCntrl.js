import createHttpError from 'http-errors';
import getUserById from '../../services/users/getUserById.js';
import { getAllStories } from '../../services/stories/getAllStories.js';
import parsePaginationParams from '../../utils/parsePaginationParams.js';

export default async function getUserByIdCntrl(req, res, next) {
  const { userId } = req.params;
  const { page, perPage } = parsePaginationParams(req.query);

  const user = await getUserById(userId);

  if (!user) {
    next(createHttpError(404, 'User not found'));
    return;
  }

  const filter = { ownerId: user._id };

  const response = await getAllStories({ page, perPage, filter });

  const traveller = {
    _id: user._id,
    name: user.name,
    avatarUrl: user.avatarUrl,
    description: user.description,
  };

  if (response?.totalItems === 0) {
    res.json({
      status: 200,
      message: `This user hasn't write stories yet.`,
      data: {
        user: traveller,
        stories: [],
        page: 1,
        perPage: 1,
        totalItems: 0,
        totalPages: 1,
        hasNextPage: false,
        hasPreviousPage: false,
      },
    });
  }

  const data = {
    user: traveller,
    stories: response.data,
    page: response.page,
    perPage: response.perPage,
    totalItems: response.totalItems,
    totalPages: response.totalPages,
    hasNextPage: response.hasNextPage,
    hasPreviousPage: response.hasPreviousPage,
  };

  res.json({
    status: 200,
    message: `Successfully found user: ${user.name} with stories!`,
    data: data,
  });
}
