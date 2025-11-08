import Joi from 'joi';

export const createStorySchema = Joi.object({
  img: Joi.any().meta({ swaggerType: 'file' }).required(),
  title: Joi.string().max(80).required(),
  description: Joi.string().max(2500).required(),
  category: Joi.string().hex().length(24).required(),
});
