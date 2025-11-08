import { UsersCollection } from '../../db/models/users.js';
import calculatePaginationData from '../../utils/calculatePaginationData.js';

export const getAllUsers = async ({
  page = 1,
  perPage = 10,
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const usersQuery = UsersCollection.find();

  const userCount = await UsersCollection.find().merge(usersQuery).countDocuments();
  const users = await usersQuery
    .skip(skip)
    .limit(limit)
    .exec();

  const paginationData = calculatePaginationData(userCount, perPage, page);

  return {
    data: users,
    ...paginationData,
  };
};