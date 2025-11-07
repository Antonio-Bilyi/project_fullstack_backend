import Joi from 'joi';

export const updateUserProfileSchema = Joi.object({
  name: Joi.string().max(32),
  email: Joi.string().email().max(64).trim().lowercase(),
  password: Joi.string().min(8).max(128),
}).min(1);
