const parseCategory = (category) => {
    const isString = typeof category === 'string';
    if (!isString) return;

    const isCategory = (category) => ['Азія', 'Гори', 'Європа',
        'Америка', 'Африка', 'Пустелі', 'Балкани', 'Кавказ', 'Океанія'].includes(category);
    if (isCategory(category)) return category;
};

export default function parseFilterParams(query) {
    const { category } = query;

    const parsedCategory = parseCategory(category);

    return { category: parsedCategory };
};