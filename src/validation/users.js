import Joi from 'joi';

export const updateUserProfileSchema = Joi.object({
  name: Joi.string().min(3).max(32).messages({
    'string.min': 'Name must be at least 3 characters long',
    'string.max': 'Name must be no more than 32 characters long',
  }),
  avatarUrl: Joi.string().uri().messages({
    'string.uri': 'Avatar URL must be a valid URI',
  }),
  description: Joi.string().max(512).messages({
    'string.max': 'Description must be no more than 512 characters long',
  }),
})
  .min(1)
  .messages({
    'object.min': 'At least one profile field must be provided',
  });
