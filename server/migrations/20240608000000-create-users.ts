import type { QueryInterface } from 'sequelize'
import { DataTypes } from 'sequelize'

export const up = async (queryInterface: QueryInterface) => {
  // Проверяем, существует ли таблица
  const tableExists = await queryInterface.tableExists('users')
  if (tableExists) {
    console.log('Таблица users уже существует')
    return
  }

  await queryInterface.createTable('users', {
    user_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    nickname: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    surname: {
      type: DataTypes.STRING,
      allowNull: true
    },
    patronymic: {
      type: DataTypes.STRING,
      allowNull: true
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false
    }
  })
}

export const down = async (queryInterface: QueryInterface) => {
  await queryInterface.dropTable('users')
}
