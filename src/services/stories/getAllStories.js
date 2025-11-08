import { StoriesCollection } from '../../db/models/stories.js';
import calculatePaginationData from '../../utils/calculatePaginationData.js';

export const getAllStories = async ({
  page,
  perPage,
  sortOrder,
  sortBy,
  filter = {},
}) => {
  const limit = perPage;
  const skip = page > 0 ? (page - 1) * perPage : 0;

  const storiesQuery = StoriesCollection.find();

  if (filter.category) {
    storiesQuery.where('category').in(filter.category);
  }

  const totalStoriesCount = await StoriesCollection.find()
    .merge(storiesQuery)
    .countDocuments();

  const sortDirection = sortOrder === 'asc' ? 1 : -1;

  const stories = await storiesQuery
    .skip(skip)
    .limit(limit)
    .sort({ [sortBy]: sortDirection })
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
