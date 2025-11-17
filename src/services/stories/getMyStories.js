import { SORT_ORDER } from '../../constants/index.js';
import { StoriesCollection } from '../../db/models/stories.js';
import calculatePaginationData from '../../utils/calculatePaginationData.js';

export const getMyStories = async ({
  page = 1,
  perPage = 10,
  filter = {},
  filterAll = {},
  sortOrder = SORT_ORDER.DESC,
  sortBy = 'date',
}) => {
  const limit = perPage;
  const skip = page > 0 ? (page - 1) * perPage : 0;

  const storiesQuery = StoriesCollection.find();

  if (filter.ownerId) {
    storiesQuery.where('ownerId').equals(filter.ownerId);
  }

  if (filterAll._id) {
    storiesQuery.find({
      _id: { $in: filterAll._id },
    });
  }

  const [totalStoriesCount, stories] = await Promise.all([
    StoriesCollection.find().merge(storiesQuery).countDocuments(),
    storiesQuery
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(limit)
      .populate('category')
      .populate({ path: 'ownerId', select: '_id name avatarUrl' })
      .exec(),
  ]);

  const paginationData = calculatePaginationData(
    totalStoriesCount,
    perPage,
    page,
  );

  return {
    stories,
    ...paginationData,
  };
};
