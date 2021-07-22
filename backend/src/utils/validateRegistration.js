import Joi from 'joi';

export default function validateRegistration(data) {
  const schema = Joi.object({
    firstName: Joi.string().required().messages({
      'string.empty': 'First name is missing',
      'any.required': 'First name is missing',
    }),
    lastName: Joi.string().required().messages({
      'string.empty': 'Last name is missing',
      'any.required': 'Last name is missing',
    }),
    email: Joi.string().required().email().messages({
      'string.empty': 'Email is missing',
      'any.required': 'Email is missing',
      'string.email': 'Email is invalid',
    }),
    password: Joi.string().min(8).required().messages({
      'string.empty': 'Password is missing',
      'any.required': 'Password is missing',
      'string.min': 'Password must be 8 character long',
    }),
  });
  return schema.validate(data, { abortEarly: false });
}
