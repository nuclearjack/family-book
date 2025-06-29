import Joi from 'joi'

export const personsSchema = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(10),
  search: Joi.string().allow('').default(''),
  sortBy: Joi.string().valid('surname', 'name', 'patronymic').default('surname'),
  sortOrder: Joi.string().valid('ASC', 'DESC').insensitive().default('ASC')
})

export const personSchema = Joi.object({
  person_id: Joi.number().min(1).optional(),
  user_id: Joi.number().min(1).optional(),
  name: Joi.string().min(1).required().messages({
    'string.base': 'Некорректное имя',
    'string.empty': 'Обязательное поле',
    'any.required': 'Обязательное поле'
  }),
  surname: Joi.string().min(1).required().messages({
    'string.base': 'Некорректная фамилия',
    'string.empty': 'Обязательное поле',
    'any.required': 'Обязательное поле'
  }),
  patronymic: Joi.string().required().allow('').messages({
    'string.base': 'Отчество должно быть строкой'
  }),
  relationship: Joi.string().min(1).required().messages({
    'string.base': 'Некорректная степень родства',
    'string.empty': 'Обязательное поле',
    'any.required': 'Обязательное поле'
  }),
  birth_date: Joi.date().optional().allow(null).messages({
    'date.base': 'Некорректная дата'
  }),
  death_date: Joi.date().optional().allow(null).messages({
    'date.base': 'Некорректная дата'
  }),
  description: Joi.string().optional().allow('').messages({
    'string.base': 'Некорректное описание'
  }),
  image: Joi.string().optional().allow('').messages({
    'string.base': 'Некорректная ссылка на изображение'
  }),
  sex: Joi.string().valid('male', 'female', 'other').required().messages({
    'any.only': 'Некорректный пол',
    'any.required': 'Обязательное поле'
  }),
  new_poster: Joi.number().allow(null).messages({
    'string.base': 'Некорректный ID изображения'
  }),
  new_gallery: Joi.array().items(Joi.number()).messages({
    'array.base': 'Галерея должна быть массивом',
    'array.includes': 'Галерея должна содержать только числа'
  }),
  delete_gallery: Joi.array().items(Joi.number()).messages({
    'array.base': 'Галерея должна быть массивом',
    'array.includes': 'Галерея должна содержать только числа'
  })
})
