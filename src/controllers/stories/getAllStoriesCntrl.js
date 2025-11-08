import { getAllStories } from '../../services/stories/getAllStories.js';
import parsePaginationParams from '../../utils/parsePaginationParams.js';
import parseSortParams from '../../utils/parseSortParams.js';
import parseFilterParams from '../../utils/parseFilterParams.js';

export const getAllStoriesCntrl = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortOrder, sortBy } = parseSortParams(req.query);
  const filter = await parseFilterParams(req.query);

  const stories = await getAllStories({
    page,
    perPage,
    filter,
    sortOrder,
    sortBy,
  });

  res.status(200).json({
    status: 200,
    message: 'Stories fetched successfully',
    data: stories,
  });
};
