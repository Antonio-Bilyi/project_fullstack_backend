import { getAllUsers } from '../../services/users/getAllUsers.js';
import parsePaginationParams from '../../utils/parsePaginationParams.js';
import parseSortParams from '../../utils/parseSortParams.js';

export const getAllUsersCntrl = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);

  const users = await getAllUsers({
    page,
    perPage,
    sortBy,
    sortOrder,
  });

  res.status(200).json({
    status: 200,
    message: 'Successfully found users!',
    data: users,
  });
};
