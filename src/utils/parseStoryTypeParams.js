import { TYPE_STORIES } from '../constants/index.js';

const parseStoriesType = (storiesType) => {
  const isKnownType = [TYPE_STORIES.OWN, TYPE_STORIES.SVD].includes(
    storiesType,
  );
  if (isKnownType) return storiesType;
  return TYPE_STORIES.OWN;
};

export default function parseStoryTypeParams(query) {
  const { storiesType } = query;

  const parsedSortOrder = parseStoriesType(storiesType);

  return {
    storiesType: parsedSortOrder,
  };
}
