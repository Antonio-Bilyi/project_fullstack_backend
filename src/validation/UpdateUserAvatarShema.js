import Joi from 'joi';

export const UpdateUserAvatarSchema = Joi.object({
  avatar: Joi.object({
    fieldname: Joi.string(),
    originalname: Joi.string(),
    encoding: Joi.string(),
    mimetype: Joi.string()
      .valid('image/jpeg', 'image/png', 'image/gif')
      .required()
      .messages({
        'any.only': 'Allowed file types are: JPG, PNG, GIF',
        'any.required': 'Avatar file is required',
      }),
    size: Joi.number()
      .max(500 * 1024)
      .required()
      .messages({
        'number.max': 'File size must not exceed 500 kB',
        'any.required': 'Avatar file is required',
      }),
    filename: Joi.string(),
    path: Joi.string(),
  }).required(),
});
