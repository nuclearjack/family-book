import { createReadStream, existsSync } from 'fs'
import { join } from 'path'

export default defineEventHandler(async (event) => {
  const { filename } = event.context.params
  const filePath = join(process.cwd(), 'uploads', filename)
  if (!existsSync(filePath)) {
    throw createError({ statusCode: 404, statusMessage: 'File not found' })
  }
  return sendStream(event, createReadStream(filePath))
})
