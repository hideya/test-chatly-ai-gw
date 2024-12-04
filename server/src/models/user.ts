import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
import { getDb } from '../services/database';

const sequelize = getDb();

interface UserAttributes {
  id: number;
  username: string;
  password: string;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public username!: string;
  public password!: string;

  public static initModel(sequelize: Sequelize) {
    User.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        username: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: 'User',
      }
    );
  }

  public static async createUser(data: UserCreationAttributes): Promise<User> {
    return await User.create(data);
  }

  public static async findUser(options: any): Promise<User | null> {
    return await User.findOne(options);
  }
}

export { User };
