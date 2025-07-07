import formidable from 'formidable'
import { promises as fs } from 'fs'
import File from '../../models/file.model'
import { getFileType } from '~/server/utils/file'

const UPLOAD_DIR = 'uploads'
const FORM_CONFIG = {
  uploadDir: UPLOAD_DIR,
  keepExtensions: true,
  maxFileSize: 2 * 1024 * 1024,
  maxTotalFileSize: 32 * 2 * 1024 * 1024
}

export default defineEventHandler(async (event) => {
  const session = await getUserSession(event)
  const userId = Number(session?.user?.user_id)

  if (!userId) {
    throw createError({ statusCode: 401, message: 'Вы не авторизованы' })
  }

  await fs.mkdir(UPLOAD_DIR, { recursive: true })

  const form = formidable({
    ...FORM_CONFIG,
    filter: (part) => {
      return part.mimetype?.startsWith('image/') || false
    }
  })

  try {
    const [err, , files] = await new Promise<
      [Error | null, formidable.Fields, formidable.Files]
    >((resolve) => {
      form.parse(event.node.req, (err, fields, files) => {
        resolve([err, fields, files])
      })
    })

    if (err) {
      if (err.message?.includes('maxFileSize')) {
        throw createError({ statusCode: 400, message: 'Размер файла превышает допустимый лимит' })
      }

      if (err.message?.includes('maxTotalFileSize')) {
        throw createError({ statusCode: 400, message: 'Общий размер файлов превышает допустимый лимит' })
      }

      throw createError({ statusCode: 400, message: 'Ошибка при загрузке файла' })
    }

    const uploaded = Array.isArray(files.file) ? files.file[0] : files.file

    if (!uploaded) {
      throw createError({ statusCode: 400, message: 'Файл не найден' })
    }

    if (!uploaded.mimetype?.startsWith('image/')) {
      throw createError({ statusCode: 400, message: 'Недопустимый тип файла' })
    }

    const fileRecord = await File.create({
      user_id: userId,
      original_name: uploaded.originalFilename || 'unknown',
      file_name: uploaded.newFilename || '',
      file_path: `/api/uploads/${uploaded.newFilename}`,
      file_size: uploaded.size || 0,
      mime_type: uploaded.mimetype || 'application/octet-stream',
      file_type: getFileType(uploaded.mimetype || 'application/octet-stream'),
      uploaded_at: new Date()
    })

    return {
      message: 'Файл успешно загружен',
      data: {
        file_id: fileRecord.file_id,
        url: fileRecord.file_path,
        original_name: fileRecord.original_name,
        file_size: fileRecord.file_size,
        mime_type: fileRecord.mime_type,
        file_type: fileRecord.file_type
      }
    }
  } catch (error: unknown) {
    if (error && typeof error === 'object' && 'statusCode' in error) {
      throw error
    }
    throw createError({
      statusCode: 500,
      message: 'Ошибка при сохранении файла в базу данных'
    })
  }
})
