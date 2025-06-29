import bcrypt from 'bcryptjs'
import type { QueryInterface } from 'sequelize'

export const up = async (queryInterface: QueryInterface) => {
  try {
    await queryInterface.bulkInsert('users', [
      {
        nickname: 'nuclearjack',
        password: bcrypt.hashSync(process.env.ADMIN_PASS as string, 10),
        name: null,
        surname: null,
        patronymic: null
      }
    ])
  } catch {
    console.log('Пользователи уже существуют, пропускаем сидер')
  }
}

export const down = async (queryInterface: QueryInterface) => {
  await queryInterface.bulkDelete('users', {})
}
