import type { PersonImage } from '@entities/person'
import type { PersonGalleryItem } from '../model'

export const galleryToFiles = (gallery: PersonImage[]): PersonGalleryItem[] => {
  return gallery.map(file => ({
    id: String(file.file_id!),
    file_id: file.file_id!,
    name: file.file_path,
    status: 'finished',
    url: file.file_path
  }))
}
