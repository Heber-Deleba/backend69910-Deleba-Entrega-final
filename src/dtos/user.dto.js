import Joi from "joi";

export const userDto = Joi.object({
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  email: Joi.string().email().required(),
  age: Joi.number().integer().min(0).required(),
  password: Joi.string().min(6).required(),
});
