import Joi from 'joi';

export default function validateRegistration(data) {
  const schema = Joi.object({
    email: Joi.string().required().email().messages({
      'string.empty': 'Email is missing',
      'any.required': 'Email is missing',
      'string.email': 'Email is incorrect',
    }),
    password: Joi.string().min(8).required().messages({
      'string.empty': 'Password is missing',
      'any.required': 'Password is missing',
      'string.min': 'Password must be 8 character long',
    }),
  });
  return schema.validate(data, { abortEarly: false });
}
