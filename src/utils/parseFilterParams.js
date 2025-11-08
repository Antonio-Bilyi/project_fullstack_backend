import { CategoriesCollection } from "../db/models/categories.js";

const parseCategory = async (category) => {
    if (typeof category !== 'string') return null;

    if (category === "All") return null;

    const foundCategory = await CategoriesCollection.findOne({ name: category });
    if (!foundCategory) return null;

    return foundCategory._id;

};

export default async function parseFilterParams(query) {
    const { category } = query;

    const categoryId = await parseCategory(category);

    return categoryId ? { category: categoryId } : {};
};