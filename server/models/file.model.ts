import { Model, DataTypes } from 'sequelize'
import sequelize from '../config/database'

class File extends Model {
  declare file_id: number
  declare user_id: number
  declare original_name: string
  declare file_name: string
  declare file_path: string
  declare file_size: number
  declare mime_type: string
  declare file_type: 'image' | 'document' | 'video' | 'audio'
  declare width?: number
  declare height?: number
  declare uploaded_at: Date
}

File.init(
  {
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
      }
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
  },
  {
    sequelize,
    modelName: 'File',
    tableName: 'files',
    timestamps: false,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
)

export default File
