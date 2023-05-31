import * as Joi from 'joi';

const erroIsRequired = '{{#label}} is required';

const registerSchema = Joi.object({
  username: Joi.string().required().min(2).label('username'),
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required().label('email'),
  password: Joi.string().required().min(6).label('password'),
}).messages({
  'string.empty': erroIsRequired,
  'any.required': erroIsRequired,
  'email.email': '{{#label}} must be a valid email',
  'any.min': '{{#label}} length must be at last {#limit} characters long',
});

export default registerSchema;
