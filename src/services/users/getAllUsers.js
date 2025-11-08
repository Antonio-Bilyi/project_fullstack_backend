import { UsersCollection } from '../../db/models/users.js';
import calculatePaginationData from '../../utils/calculatePaginationData.js';
import { SORT_ORDER } from '../../constants/index.js';

export const getAllUsers = async ({
  page = 1,
  perPage = 10,
  sortOrder = SORT_ORDER.ASC,
  sortBy = '_id',
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const usersQuery = UsersCollection.find();

  const userCount = await UsersCollection.find().merge(usersQuery).countDocuments();
  const users = await usersQuery
    .skip(skip)
    .limit(limit)
    .sort({ [sortBy]: sortOrder })
    .exec();

  const paginationData = calculatePaginationData(userCount, perPage, page);

  return {
    data: users,
    ...paginationData,
  };
};