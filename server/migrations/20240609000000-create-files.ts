import type { QueryInterface } from 'sequelize'
import { DataTypes } from 'sequelize'

export const up = async (queryInterface: QueryInterface) => {
  // Проверяем, существует ли таблица
  const tableExists = await queryInterface.tableExists('files')
  if (tableExists) {
    console.log('Таблица files уже существует')
    return
  }

  await queryInterface.createTable('files', {
    file_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'user_id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    original_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    file_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    file_path: {
      type: DataTypes.STRING,
      allowNull: false
    },
    file_size: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    mime_type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    file_type: {
      type: DataTypes.ENUM('image', 'document', 'video', 'audio'),
      allowNull: false,
      defaultValue: 'image'
    },
    width: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    height: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    uploaded_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  })

  // Создаем индексы с проверкой существования
  try {
    await queryInterface.addIndex('files', ['user_id'])
  } catch {
    console.log('Индекс files_user_id уже существует')
  }

  try {
    await queryInterface.addIndex('files', ['file_type'])
  } catch {
    console.log('Индекс files_file_type уже существует')
  }

  try {
    await queryInterface.addIndex('files', ['uploaded_at'])
  } catch {
    console.log('Индекс files_uploaded_at уже существует')
  }
}

export const down = async (queryInterface: QueryInterface) => {
  await queryInterface.dropTable('files')
}
