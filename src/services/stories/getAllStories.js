import { SORT_ORDER } from '../../constants/index.js';
import { StoriesCollection } from '../../db/models/stories.js';
import calculatePaginationData from '../../utils/calculatePaginationData.js';

export const getAllStories = async ({
  page = 1,
  perPage = 10,
  filter = {},
  sortOrder = SORT_ORDER.ASC,
  sortBy = 'date',
}) => {
  const limit = perPage;
  const skip = page > 0 ? (page - 1) * perPage : 0;

  const mongooseFilter = {};

  if (filter.category) {
    mongooseFilter.category = filter.category;
  }

  // для запиту по отримання історій користувача
  if (filter.ownerId) {
    mongooseFilter.ownerId = filter.ownerId;
  }

  const totalStoriesCount = await StoriesCollection.countDocuments(
    mongooseFilter,
  );

  const stories = await StoriesCollection.find(mongooseFilter)
    .sort({ [sortBy]: sortOrder })
    .skip(skip)
    .limit(limit)
    .populate('category')
    .populate({ path: 'ownerId', select: '_id name avatarUrl' })
    .exec();

  const paginationData = calculatePaginationData(
    totalStoriesCount,
    perPage,
    page,
  );

  return {
    data: stories,
    ...paginationData,
  };
};
