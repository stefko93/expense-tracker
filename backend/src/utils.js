import Joi from 'joi';
/* eslint no-param-reassign: "error" */

function validateLoginData(data) {
  const schema = Joi.object({
    email: Joi.string().required().email().messages({
      'string.empty': 'Email is required',
      'any.required': 'Email is required',
      'string.email': 'Invalid email',
    }),
    password: Joi.string()
      .required()
      .pattern(
        /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/
      )
      .messages({
        'string.empty': 'Password is required',
        'any.required': 'Password is required',
        'string.pattern.base':
          'Password should be at least 8 characters long, should contain a number, a capital letter, and a symbol',
      }),
  });
  return schema.validate(data, { abortEarly: false });
}

function validateUserData(data) {
  const schema = Joi.object({
    firstName: Joi.string().required().messages({
      'string.empty': 'First name is required',
      'any.required': 'First name is required',
    }),
    lastName: Joi.string().required().messages({
      'string.empty': 'Last name is required',
      'any.required': 'Last name is required',
    }),
    email: Joi.string().required().email().messages({
      'string.empty': 'Email is required',
      'any.required': 'Email is required',
      'string.email': 'Invalid email',
    }),
    password: Joi.string()
      .required()
      .pattern(
        /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/
      )
      .messages({
        'string.empty': 'Password is required',
        'any.required': 'Password is required',
        'string.pattern.base':
          'Password should be at least 8 characters long, should contain a number, a capital letter, and a symbol',
      }),
  });
  return schema.validate(data, { abortEarly: false });
}

export { validateLoginData, validateUserData };
