import Joi from 'joi';

export const UpdateUserAvatarSchema = Joi.object({
  avatar: Joi.object({
    fieldname: Joi.string().required(),
    originalname: Joi.string().required(),
    encoding: Joi.string().required(),
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
    filename: Joi.string().required(),
    path: Joi.string().required(),
  }).required()
    .unknown(false),
});
