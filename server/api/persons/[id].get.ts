import { Person, PersonFile, File } from '~/server/models'

export interface PersonImage {
  file_id: number | null
  file_path: string
}

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

  const person = await Person.findByPk(id, {
    include: [
      {
        model: PersonFile,
        as: 'files',
        required: false,
        include: [
          {
            model: File,
            as: 'file'
          }
        ]
      }
    ]
  })

  if (!person) {
    throw createError({ statusCode: 404, message: 'Биография не найдена' })
  }

  if (person.user_id !== userId) {
    throw createError({ statusCode: 403, message: 'Ошибка доступа' })
  }

  const { files, ...rest } = person.toJSON()

  let poster: PersonImage | null = null

  const gallery: PersonImage[] = []

  if (Array.isArray(files)) {
    for (const pf of files) {
      if (pf.is_main && pf.file) {
        poster = { file_id: pf.file.file_id, file_path: pf.file.file_path }
      } else if (pf.file) {
        gallery.push({ file_id: pf.file.file_id, file_path: pf.file.file_path })
      }
    }
  }
  const result = {
    ...rest,
    poster,
    gallery
  }

  return {
    data: { person: result }
  }
})
