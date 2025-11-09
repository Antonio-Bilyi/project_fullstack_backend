import Joi from 'joi';

export const updateUserProfileSchema = Joi.object({
  name: Joi.string().min(3).max(32),
  avatarUrl: Joi.string().uri(),
  description: Joi.string().max(512),
})
  .min(1)
  .messages({
    'object.min': 'At least one profile field must be provided',
  });
