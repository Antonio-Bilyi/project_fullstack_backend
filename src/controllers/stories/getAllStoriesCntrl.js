import { getAllStories } from '../../services/stories/getAllStories.js';
import parsePaginationParams from '../../utils/parsePaginationParams.js';
import parseSortParams from '../../utils/parseSortParams.js';

export const getAllStoriesCntrl = async (req, res, next) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortOrder, sortBy } = parseSortParams(req.query);
  const { category } = req.query;

  const result = await getAllStories({
    page,
    perPage,
    sortOrder,
    sortBy,
    category,
  });

  res.status(200).json({
    status: 200,
    message: 'Stories fetched successfully',
    data: result,
  });
};
