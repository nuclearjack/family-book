import type { QueryInterface } from 'sequelize'
import { DataTypes } from 'sequelize'

export const up = async (queryInterface: QueryInterface) => {
  // Проверяем, существует ли таблица
  const tableExists = await queryInterface.tableExists('persons')
  if (tableExists) {
    console.log('Таблица persons уже существует')
    return
  }

  await queryInterface.createTable('persons', {
    person_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    surname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    patronymic: {
      type: DataTypes.STRING,
      allowNull: false
    },
    relationship: {
      type: DataTypes.STRING,
      allowNull: false
    },
    birth_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    death_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true
    },
    sex: {
      type: DataTypes.STRING,
      allowNull: false
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
  await queryInterface.dropTable('persons')
}
