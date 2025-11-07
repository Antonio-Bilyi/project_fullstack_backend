import Joi from 'joi';

export const updateStorySchema = Joi.object({
  img: Joi.string(),

  title: Joi.string().min(3).max(100),

  article: Joi.string().min(10),

  category: Joi.object({
    $oid: Joi.string().length(24).hex(),
  }),
  ownerId: Joi.object({
    $oid: Joi.string().length(24).hex(),
  }),

  date: Joi.date().iso().messages({}),

  favoriteCount: Joi.number().integer().min(0),
});
