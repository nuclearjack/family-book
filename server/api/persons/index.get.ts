import Person from '../../models/person.model'
import { PersonFile, File } from '~/server/models'
import { Op } from 'sequelize'
import { personsSchema } from '~/server/schemas/person'

const buildOrderClause = (sortBy: string, sortOrder: string): [string, string][] => {
  if (sortBy === 'name') {
    return [
      ['name', sortOrder],
      ['surname', sortOrder]
    ]
  }
  if (sortBy === 'surname') {
    return [
      ['surname', sortOrder],
      ['name', sortOrder]
    ]
  }
  return [[sortBy, sortOrder]]
}

const buildWhereClause = (search: string) => {
  const searchFields = ['name', 'surname', 'patronymic']
  if (!search) return {}

  const searchWords = search.trim().split(/\s+/).filter(Boolean)
  if (searchWords.length > 1) {
    const combinations = []

    if (searchWords.length === 2) {
      combinations.push(
        {
          name: { [Op.iLike]: `%${searchWords[0]}%` },
          surname: { [Op.iLike]: `%${searchWords[1]}%` }
        },
        {
          surname: { [Op.iLike]: `%${searchWords[0]}%` },
          name: { [Op.iLike]: `%${searchWords[1]}%` }
        }
      )
    }

    if (searchWords.length === 3) {
      combinations.push(
        {
          name: { [Op.iLike]: `%${searchWords[0]}%` },
          surname: { [Op.iLike]: `%${searchWords[1]}%` },
          patronymic: { [Op.iLike]: `%${searchWords[2]}%` }
        },
        {
          surname:
          { [Op.iLike]: `%${searchWords[0]}%` },
          name: { [Op.iLike]: `%${searchWords[1]}%` },
          patronymic: { [Op.iLike]: `%${searchWords[2]}%` }
        }
      )
    }

    return { [Op.or]: combinations }
  } else {
    return {
      [Op.or]: searchFields.map(field => ({
        [field]: { [Op.iLike]: `%${search}%` }
      }))
    }
  }
}

export default defineEventHandler(async (event) => {
  const session = await getUserSession(event)
  const userId = session?.user?.user_id
  if (!userId) {
    throw createError({ statusCode: 401, message: 'Вы не авторизованы' })
  }

  const { value: params, error } = personsSchema.validate(getQuery(event), { abortEarly: false })
  if (error) {
    throw createError({
      statusCode: 400,
      message: 'Некорректные параметры запроса',
      data: error.details
    })
  }

  const { page, limit, search, sortBy, sortOrder } = params
  const orderClause = buildOrderClause(sortBy, sortOrder)
  const whereClause = buildWhereClause(search)
  const offset = (page - 1) * limit

  const { count, rows: persons } = await Person.findAndCountAll({
    where: {
      ...whereClause,
      user_id: userId
    },
    include: [
      {
        model: PersonFile,
        as: 'files',
        where: { is_main: true },
        required: false,
        include: [
          {
            model: File,
            as: 'file'
          }
        ]
      }
    ],
    order: orderClause,
    limit,
    offset
  })

  const totalPages = Math.ceil(count / limit)
  const hasNextPage = page < totalPages
  const hasPrevPage = page > 1

  const personsWithImages = persons.map(person => {
    const { files, ...rest } = person.toJSON()
    return {
      ...rest,
      poster: files?.[0]?.file
        ? {
            file_id: files[0].file.file_id,
            file_path: files[0].file.file_path
          }
        : null
    }
  })

  return {
    message: 'Успешный зпрос',
    data: {
      persons: personsWithImages,
      pagination: {
        currentPage: page,
        totalPages,
        totalItems: count,
        itemsPerPage: limit,
        hasNextPage,
        hasPrevPage
      }
    }
  }
})
