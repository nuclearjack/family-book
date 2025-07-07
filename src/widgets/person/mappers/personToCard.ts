import type { Person } from '@entities/person'
import { formatDate } from '@shared/lib'

export const personToCard = (person: Person) => {
  return {
    ...person,
    birth_date: person.birth_date ? formatDate(person.birth_date) : 'Нет данных',
    death_date: person.death_date ? formatDate(person.death_date) : ''
  }
}
