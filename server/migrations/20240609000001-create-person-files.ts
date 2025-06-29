import type { QueryInterface } from 'sequelize'
import { DataTypes } from 'sequelize'

export const up = async (queryInterface: QueryInterface) => {
  // Проверяем, существует ли таблица
  const tableExists = await queryInterface.tableExists('person_files')
  if (tableExists) {
    console.log('Таблица person_files уже существует')
    return
  }

  await queryInterface.createTable('person_files', {
    person_file_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    person_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'persons',
        key: 'person_id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    file_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'files',
        key: 'file_id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    is_main: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    sort_order: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    added_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  })

  // Создаем индексы с проверкой существования
  try {
    await queryInterface.addIndex('person_files', ['person_id'])
  } catch {
    console.log('Индекс person_files_person_id уже существует')
  }

  try {
    await queryInterface.addIndex('person_files', ['file_id'])
  } catch {
    console.log('Индекс person_files_file_id уже существует')
  }

  try {
    await queryInterface.addIndex('person_files', ['is_main'])
  } catch {
    console.log('Индекс person_files_is_main уже существует')
  }

  try {
    await queryInterface.addIndex('person_files', ['sort_order'])
  } catch {
    console.log('Индекс person_files_sort_order уже существует')
  }

  // Уникальный индекс для person_id + file_id
  try {
    await queryInterface.addIndex('person_files', ['person_id', 'file_id'], {
      unique: true
    })
  } catch {
    console.log('Уникальный индекс person_files_person_id_file_id уже существует')
  }
}

export const down = async (queryInterface: QueryInterface) => {
  await queryInterface.dropTable('person_files')
}
