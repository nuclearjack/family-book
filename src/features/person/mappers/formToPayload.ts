import type { PersonFormData, PersonGalleryItem } from '../model'

export const formToPayload = (form: PersonFormData, galleryData: PersonGalleryItem[]) => {
  const {
    created_at: createdAt,
    updated_at: updatedAt,
    poster,
    gallery,
    ...rest
  } = form

  const payload = { ...rest }

  payload.new_gallery = galleryData.map(g => g.file_id as number)

  return payload
}
