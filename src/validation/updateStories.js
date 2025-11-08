import Joi from 'joi';

export const updateStorySchema = Joi.object({
  photo: Joi.string(),

  title: Joi.string().min(3).max(80).optional(),

  description: Joi.string().max(2500).optional(),

  category: Joi.string().hex().required(),
});
