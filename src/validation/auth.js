import Joi from "joi";

export const registerUserSchema = Joi.object({
    name: Joi.string().min(3).max(32).required(),
    email: Joi.string().email().max(64).trim().lowercase().required(),
    password: Joi.string().min(8).max(128).required(),
});

export const loginSchema = Joi.object({
    email: Joi.string().email().trim().lowercase().required(),
    password: Joi.string().required(),
});