import { StoriesCollection } from '../../db/models/stories.js';

export function createStory(payload) {
  return StoriesCollection.create(payload);
}
