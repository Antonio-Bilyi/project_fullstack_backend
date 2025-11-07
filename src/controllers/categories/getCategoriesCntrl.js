import { categoriesCollection } from '../../db/models/categories.js';

/**
 * Повертає перелік категорій історій, відсортований за назвою.
 */
export const getCategoriesCntrl = async (req, res) => {
  const categories = await categoriesCollection
    .find({}, null, { sort: { name: 1 } })
    .lean();

  res.status(200).json({
    status: 200,
    message: 'OK',
    data: categories,
  });
};
