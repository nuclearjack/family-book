import { Model, DataTypes } from 'sequelize'
import sequelize from '../config/database'

interface PersonFile {
  is_main: boolean
  sort_order: number
  added_at: Date
  file?: File
  file_id: number
}

class Person extends Model {
  declare person_id: number
  declare user_id: number
  declare name: string
  declare surname: string
  declare patronymic: string
  declare relationship: string
  declare birth_date: Date
  declare death_date: Date | null
  declare description: string | null
  declare sex: string
  declare created_at: Date
  declare updated_at: Date
  declare files: PersonFile[]
}

Person.init(
  {
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
      allowNull: false
    },
    sex: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: 'Person',
    tableName: 'persons',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
)

export default Person
