import sequelize from '../config/database'
import '../models' // Импортируем все модели для регистрации связей

export const initDatabase = async () => {
  try {
    await sequelize.authenticate()
    console.log('Database connection has been established successfully.')

    // Синхронизируем модели с базой данных
    await sequelize.sync({ alter: true })
    console.log('Database synchronized successfully.')
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}
