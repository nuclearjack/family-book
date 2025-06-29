import { PersonFile } from '~/server/models'
import Person from '../../models/person.model'

export default defineEventHandler(async (event) => {
  const session = await getUserSession(event)
  const userId = Number(session?.user?.user_id)
  if (!userId) {
    throw createError({ statusCode: 401, message: 'Вы не авторизованы' })
  }

  const id = parseInt(getRouterParam(event, 'id') || '0')

  if (!id || isNaN(id)) {
    throw createError({ statusCode: 400, message: 'Некорректный идентификатор' })
  }

  const person = await Person.findByPk(id)

  if (!person) {
    throw createError({ statusCode: 404, message: 'Биография не найдена' })
  }

  if (person.user_id !== userId) {
    throw createError({ statusCode: 404, message: 'Нет прав' })
  }

  await PersonFile.destroy({ where: { person_id: id } })

  await person.destroy()

  return {
    message: 'Биография успешно удалена'
  }
})
