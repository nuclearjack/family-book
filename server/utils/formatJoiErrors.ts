import type Joi from 'joi'

export const formatJoiErrors = (details: Joi.ValidationErrorItem[]) => {
  const errors: Record<string, string> = {}
  details.forEach((err) => {
    const key = err.path.join('.')
    errors[key] = err.message
  })
  return errors
}
