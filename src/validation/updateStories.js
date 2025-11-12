import Joi from 'joi';
import { isValidObjectId } from 'mongoose';

export const updateStorySchema = Joi.object({
  storyImage: Joi.object({
    fieldname: Joi.string().required(),
    originalname: Joi.string().required(),
    encoding: Joi.string().required(),
    mimetype: Joi.string().valid('image/jpeg', 'image/png').required().
      messages({
        'any.only': 'Allowed file type are: JPG, PNG',
        'any.required': 'Image is required',
      }),
    size: Joi.number().max(2 * 1024 * 1024).required().
      messages({
        'number.max': 'File size must not exceed 2MB',
        'any.required': 'Image is required',
    }),
  }),
  title: Joi.string().max(80),
  article: Joi.string().max(2500),
  category: Joi.string().custom((value, helper) => {
    if (value && !isValidObjectId(value)) {
      return helper.message('Category id should be a valid mongo id');
    }
    return true;
  }).required(),
});
