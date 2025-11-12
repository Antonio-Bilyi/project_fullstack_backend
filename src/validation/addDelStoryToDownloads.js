import Joi from 'joi';
import { isValidObjectId } from 'mongoose';

export const addDelStoryToDownloadsSchema = Joi.object({
  storyId: Joi.string().custom((value, helper) => {
    if (value && !isValidObjectId(value)) {
      return helper.message('Story id should be a valid mongo id');
    }
    return true;
  }),
});
