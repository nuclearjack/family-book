import sequelize from '../config/database'
import * as createUsers from '../migrations/20240608000000-create-users'
import * as createPersons from '../migrations/20240220000000-create-persons'
import * as createFiles from '../migrations/20240609000000-create-files'
import * as createPersonFiles from '../migrations/20240609000001-create-person-files'
import * as demoUsers from '../seeders/20240608000000-demo-users'

export const migrate = async () => {
  try {
    // Запускаем миграции
    await createUsers.up(sequelize.getQueryInterface())
    await createPersons.up(sequelize.getQueryInterface())
    await createFiles.up(sequelize.getQueryInterface())
    await createPersonFiles.up(sequelize.getQueryInterface())
    console.log('✅ Миграции успешно выполнены')

    // Запускаем сидеры
    await demoUsers.up(sequelize.getQueryInterface())
    console.log('✅ Сидеры успешно выполнены')

    await sequelize.close()
  } catch (error) {
    console.error('❌ Ошибка при выполнении миграций:', error)
    process.exit(1)
  }
}
