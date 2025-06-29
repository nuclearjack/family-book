import bcrypt from 'bcryptjs'
import { registerSchema } from '../../schemas/auth'
import { formatJoiErrors } from '~/server/utils/formatJoiErrors'
import User from '../../models/user.model'

export default defineEventHandler(async (event) => {
  const session = await getUserSession(event)
  const userId = Number((session?.user)?.user_id)
  if (!userId) {
    throw createError({ statusCode: 401, message: 'Вы не авторизованы' })
  }
  if (userId !== 1) {
    throw createError({ statusCode: 401, message: 'Нет прав' })
  }

  const body = await readBody(event)
  const { error, value } = registerSchema.validate(body, { abortEarly: false })

  if (error) {
    throw createError({
      statusCode: 400,
      message: 'Некорректные параметры запроса',
      data: { errors: formatJoiErrors(error.details) }
    })
  }

  const { nickname, password, name, surname, patronymic } = value

  const existingUser = await User.findOne({ where: { nickname } })
  if (existingUser) {
    throw createError({
      statusCode: 409,
      message: 'Пользователь с таким никнеймом уже существует'
    })
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  const user = await User.create({
    nickname,
    password: hashedPassword,
    name,
    surname,
    patronymic
  })

  return {
    success: true,
    message: `Успешная регистрация пользователя ${user.nickname}`,
    user: {
      user_id: user.user_id,
      nickname: user.nickname,
      name: user.name,
      surname: user.surname,
      patronymic: user.patronymic
    }
  }
})
