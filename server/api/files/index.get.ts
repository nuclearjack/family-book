import File from '../../models/file.model'

export default defineEventHandler(async (event) => {
  const session = await getUserSession(event)
  const userId = Number((session?.user)?.user_id)

  if (!userId) {
    throw createError({ statusCode: 401, message: 'Вы не авторизованы' })
  }

  const query = getQuery(event)
  const { fileType, limit = 50, offset = 0 } = query

  const whereClause: Record<string, unknown> = { user_id: userId }
  if (fileType) {
    whereClause.file_type = fileType
  }

  const files = await File.findAll({
    where: whereClause,
    limit: Number(limit),
    offset: Number(offset),
    order: [['uploaded_at', 'DESC']]
  })

  const total = await File.count({ where: whereClause })

  return {
    files,
    total,
    limit: Number(limit),
    offset: Number(offset)
  }
})
