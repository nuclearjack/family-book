import { Model, DataTypes } from 'sequelize'
import sequelize from '../config/database'

class User extends Model {
  declare user_id: number
  declare nickname: string
  declare password: string
  declare name: string | null
  declare surname: string | null
  declare patronymic: string | null
}

User.init(
  {
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
    }
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'users'
  }
)

export default User
