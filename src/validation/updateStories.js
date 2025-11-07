import Joi from 'joi';

export const updateStorySchema = Joi.object({
  photo: Joi.string().optional(),

  title: Joi.string().min(3).max(100).optional(),

  article: Joi.string().min(10).optional(),

  category: Joi.string().length(24).hex().optional(),

  ownerId: Joi.string().length(24).hex().optional(),

  date: Joi.date().iso().messages({}).optional(),

  favoriteCount: Joi.number().integer().min(0).optional().messages(),
});
