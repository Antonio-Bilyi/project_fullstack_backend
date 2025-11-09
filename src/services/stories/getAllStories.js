import { SORT_ORDER } from '../../constants/index.js';
import { StoriesCollection } from '../../db/models/stories.js';
import calculatePaginationData from '../../utils/calculatePaginationData.js';

// export const getAllStories = async ({
//   page = 1,
//   perPage = 10,
//   filter = {},
//   sortOrder = SORT_ORDER.ASC,
//   sortBy = 'data',
// }) => {
//   const limit = perPage;
//   const skip = page > 0 ? (page - 1) * perPage : 0;

//   const storiesQuery = StoriesCollection.find();

//   if (filter.category) {
//     storiesQuery.where('category').in(filter.category);
//   }

//   const totalStoriesCount = await StoriesCollection.find()
//     .merge(storiesQuery)
//     .countDocuments();


//   const stories = await storiesQuery
//     .skip(skip)
//     .limit(limit)
//     .sort({[sortBy]: sortOrder})
//     .exec();

//   const paginationData = calculatePaginationData(
//     totalStoriesCount,
//     perPage,
//     page,
//   );

//   return {
//     data: stories,
//     ...paginationData,
//   };
// };
export const getAllStories = async ({
  page = 1,
  perPage = 10,
  filter = {},
  sortOrder = SORT_ORDER.ASC,
  sortBy = 'data',
}) => {
  const limit = perPage;
  const skip = page > 0 ? (page - 1) * perPage : 0;

  const mongooseFilter = {};


  if (filter.category) {
    mongooseFilter.category = filter.category;
  }


  const totalStoriesCount = await StoriesCollection.countDocuments(mongooseFilter);


  const stories = await StoriesCollection.find(mongooseFilter)
    .skip(skip)
    .limit(limit)
    .sort({ [sortBy]: sortOrder })
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