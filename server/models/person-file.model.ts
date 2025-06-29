import { Model, DataTypes } from 'sequelize'
import sequelize from '../config/database'
import type Person from './person.model'
import type File from './file.model'

class PersonFile extends Model {
  declare person_file_id: number
  declare person_id: number
  declare file_id: number
  declare is_main: boolean
  declare sort_order: number
  declare added_at: Date
  declare file?: File
  declare person?: Person
}

PersonFile.init(
  {
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
      }
    },
    file_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'files',
        key: 'file_id'
      }
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
  },
  {
    sequelize,
    modelName: 'PersonFile',
    tableName: 'person_files',
    timestamps: false
  }
)

// Связи вынесены в index.ts

export default PersonFile
