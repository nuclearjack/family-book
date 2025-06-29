import bcrypt from 'bcryptjs'
import { loginSchema } from '../../schemas/auth'
import { formatJoiErrors } from '~/server/utils/formatJoiErrors'
import User from '../../models/user.model'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { error, value } = loginSchema.validate(body)

  if (error) {
    throw createError({
      statusCode: 400,
      message: 'Некорректные параметры запроса',
      data: { errors: formatJoiErrors(error.details) }
    })
  }

  const { nickname, password } = value

  const user = await User.findOne({ where: { nickname } })

  if (!user) {
    throw createError({
      statusCode: 401,
      message: 'Пользователь не найден'
    })
  }

  // TODO сравнивать хэши
  const isPasswordValid = user && await bcrypt.compare(password, user.password)
  // const isPasswordValid = password === user.password

  if (!isPasswordValid) {
    throw createError({
      statusCode: 401,
      message: 'Ошибка авторизации',
      data: {
        errors: {
          password: 'Неверный пароль'
        }
      }
    })
  }

  await setUserSession(event, {
    user: {
      user_id: user.user_id,
      nickname: user.nickname,
      name: user.name,
      surname: user.surname,
      patronymic: user.patronymic
    }
  })

  // TODO обавить генерацию JWT или сессии
  return {
    success: true,
    message: `Добро пожаловать, ${user.nickname}`,
    user: {
      user_id: user.user_id,
      nickname: user.nickname,
      name: user.name,
      surname: user.surname,
      patronymic: user.patronymic
    }
  }
})
