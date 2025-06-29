import Joi from 'joi'

export const loginSchema = Joi.object({
  nickname: Joi.string().required().messages({
    'string.empty': 'Никнейм обязателен',
    'any.required': 'Никнейм обязателен'
  }),
  password: Joi.string().required().messages({
    'string.empty': 'Пароль обязателен',
    'any.required': 'Пароль обязателен'
  })
})

export const registerSchema = Joi.object({
  nickname: Joi.string().required().messages({
    'string.empty': 'Никнейм обязателен',
    'any.required': 'Никнейм обязателен'
  }),
  password: Joi.string().required().messages({
    'string.empty': 'Пароль обязателен',
    'any.required': 'Пароль обязателен'
  }),
  passwordRepeat: Joi.string().required().valid(Joi.ref('password')).messages({
    'any.only': 'Пароли не совпадают',
    'string.empty': 'Повтор пароля обязателен',
    'any.required': 'Повтор пароля обязателен'
  }),
  name: Joi.string().allow(null, ''),
  surname: Joi.string().allow(null, ''),
  patronymic: Joi.string().allow(null, '')
})
