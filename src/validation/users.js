import Joi from 'joi';

export const updateUserProfileSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(32)
    .trim()
    .pattern(/^[a-zA-Zа-яА-ЯіІїЇєЄґҐ\s'-]+$/)
    .messages({
      'string.min': 'Name must be at least 3 characters long',
      'string.max': 'Name must not exceed 32 characters',
      'string.pattern.base': 'Name can only contain letters, spaces, hyphens and apostrophes',
      'string.empty': 'Name cannot be empty',
    }),
  avatarUrl: Joi.string()
    .uri()
    .trim()
    .messages({
      'string.uri': 'Avatar URL must be a valid URL',
      'string.empty': 'Avatar URL cannot be empty',
    }),
  description: Joi.string()
    .max(512)
    .trim()
    .pattern(/^[^<>]*$/)
    .messages({
      'string.max': 'Description must not exceed 512 characters',
      'string.pattern.base': 'Description cannot contain HTML tags',
      'string.empty': 'Description cannot be empty',
    }),
})
  .min(1)
  .messages({
    'object.min': 'At least one profile field must be provided',
  });
