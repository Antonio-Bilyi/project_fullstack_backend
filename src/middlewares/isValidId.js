import { isValidObjectId } from 'mongoose';
import createHttpError from 'http-errors';

export default function isValidId(req, res, next) {
  const { storyId } = req.params;

  if (!isValidObjectId(storyId)) {
    throw createHttpError(400, 'Bad Request');
  }

  next();
}
