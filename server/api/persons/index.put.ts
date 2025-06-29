import Person from '../../models/person.model'
import { formatJoiErrors } from '~/server/utils/formatJoiErrors'
import { personSchema } from '~/server/schemas/person'
import { PersonFile } from '~/server/models'

export default defineEventHandler(async (event) => {
  const session = await getUserSession(event)
  const userId = Number(session?.user?.user_id)
  if (!userId) {
    throw createError({ statusCode: 401, message: 'Вы не авторизованы' })
  }

  const body = await readBody(event)
  const { error, value } = personSchema.validate(body, { abortEarly: false })

  if (error) {
    throw createError({
      statusCode: 400,
      message: 'Ошибка валидации',
      data: { errors: formatJoiErrors(error.details) }
    })
  }

  const {
    new_poster: newPoster,
    new_gallery: newGallery,
    delete_gallery: deleteGallery,
    ...payload
  } = value

  const person = await Person.create({
    user_id: userId,
    ...payload
  })

  if (newPoster) {
    // await PersonFile.update(
    //   { is_main: false },
    //   { where: { person_id: person.person_id, is_main: true } }
    // )

    await PersonFile.create({
      person_id: person.person_id,
      file_id: newPoster,
      is_main: true,
      sort_order: 0,
      added_at: new Date()
    })
  }

  if (newPoster === null) {
    await PersonFile.destroy({
      where: {
        person_id: person.person_id,
        is_main: true
      }
    })
  }

  if (newGallery?.length) {
    newGallery.forEach(async (g: number) => {
      await PersonFile.create({
        person_id: person.person_id,
        file_id: g,
        is_main: false,
        sort_order: 0,
        added_at: new Date()
      })
    })
  }

  if (deleteGallery?.length) {
    deleteGallery.forEach(async (g: number) => {
      await PersonFile.destroy({
        where: {
          file_id: g
        }
      })
    })
  }

  return {
    message: 'Биография успешно создана',
    data: { person }
  }
})
