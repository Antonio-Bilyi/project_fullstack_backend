import { CategoriesCollection } from '../../db/models/categories.js';

/**
 * Повертає перелік категорій історій, відсортований за назвою.
 */
export const getCategoriesCntrl = async (req, res) => {
  const categories = await CategoriesCollection
    .find({}, null, { sort: { name: 1 } })
    .lean();

  res.status(200).json({
    status: 200,
    message: "Successful got categories",
    data: categories,
  });
};
