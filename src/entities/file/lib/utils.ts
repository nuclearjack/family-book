import type { File } from '../api/types'

/**
 * Форматирует размер файла в читаемый вид
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Б'

  const k = 1024
  const sizes = ['Б', 'КБ', 'МБ', 'ГБ']
  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

/**
 * Получает расширение файла из имени
 */
export const getFileExtension = (fileName: string): string => {
  return fileName.split('.').pop()?.toLowerCase() || ''
}

/**
 * Проверяет, является ли файл изображением
 */
export const isImageFile = (file: File): boolean => {
  return file.file_type === 'image' || file.mime_type.startsWith('image/')
}

/**
 * Проверяет, является ли файл видео
 */
export const isVideoFile = (file: File): boolean => {
  return file.file_type === 'video' || file.mime_type.startsWith('video/')
}

/**
 * Проверяет, является ли файл аудио
 */
export const isAudioFile = (file: File): boolean => {
  return file.file_type === 'audio' || file.mime_type.startsWith('audio/')
}

/**
 * Проверяет, является ли файл документом
 */
export const isDocumentFile = (file: File): boolean => {
  return file.file_type === 'document' ||
         file.mime_type.startsWith('application/') ||
         file.mime_type.startsWith('text/')
}

/**
 * Получает иконку для типа файла
 */
export const getFileIcon = (file: File): string => {
  if (isImageFile(file)) return 'image'
  if (isVideoFile(file)) return 'videocam'
  if (isAudioFile(file)) return 'audiotrack'
  if (isDocumentFile(file)) return 'description'
  return 'insert_drive_file'
}

/**
 * Форматирует дату загрузки файла
 */
export const formatUploadDate = (dateString: string): string => {
  const date = new Date(dateString)
  return date.toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

/**
 * Получает полный URL файла
 */
export const getFileUrl = (file: File): string => {
  // Если это полный URL, возвращаем как есть
  if (file.file_path.startsWith('http')) {
    return file.file_path
  }

  // Иначе добавляем базовый URL
  return file.file_path.startsWith('/') ? file.file_path : `/${file.file_path}`
}

/**
 * Проверяет, поддерживается ли тип файла для загрузки
 */
export const isSupportedFileType = (file: globalThis.File): boolean => {
  const supportedTypes = [
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/webp',
    'image/svg+xml'
  ]

  return supportedTypes.includes(file.type)
}

/**
 * Валидирует файл перед загрузкой
 */
export const validateFile = (file: globalThis.File): { isValid: boolean; error?: string } => {
  const maxSize = 10 * 1024 * 1024 // 10MB

  if (file.size > maxSize) {
    return {
      isValid: false,
      error: 'Размер файла не должен превышать 10MB'
    }
  }

  if (!isSupportedFileType(file)) {
    return {
      isValid: false,
      error: 'Поддерживаются только изображения (JPEG, PNG, GIF, WebP, SVG)'
    }
  }

  return { isValid: true }
}
