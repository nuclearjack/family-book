// Импортируем все модели
import User from './user.model'
import Person from './person.model'
import File from './file.model'
import PersonFile from './person-file.model'

// Связи между моделями
PersonFile.belongsTo(File, { foreignKey: 'file_id', as: 'file' })
PersonFile.belongsTo(Person, { foreignKey: 'person_id', as: 'person' })

Person.hasOne(User, { as: 'user', sourceKey: 'person_id', foreignKey: 'person_id' })

// Связи через промежуточную таблицу
Person.hasMany(PersonFile, { foreignKey: 'person_id', as: 'files' })
File.hasMany(PersonFile, { foreignKey: 'file_id', as: 'links' })

// Экспортируем модели
export {
  User,
  Person,
  File,
  PersonFile
}

// Экспортируем все модели как объект для удобства
export default {
  User,
  Person,
  File,
  PersonFile
}
