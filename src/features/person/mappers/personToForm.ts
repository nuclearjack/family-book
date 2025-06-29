import type { Person } from '@entities/person'

export const personToForm = (person: Person) => {
  return {
    ...person,
    birth_date: person.birth_date ? new Date(person.birth_date).getTime() : null,
    death_date: person.death_date ? new Date(person.death_date).getTime() : null,
    delete_gallery: [],
    new_gallery: [],
    new_poster: null,
    poster: person.poster
      ? person.poster
      : {
          file_id: null,
          file_path: ''
        }
  }
}
