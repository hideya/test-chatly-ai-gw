import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
import { getDb } from '../services/database';

const sequelize = getDb();

interface ChatThreadAttributes {
  id: number;
  userId: number;
  messages: { sender: string; text: string }[];
  createdAt: Date;
  updatedAt: Date;
}

interface ChatThreadCreationAttributes extends Optional<ChatThreadAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

class ChatThread extends Model<ChatThreadAttributes, ChatThreadCreationAttributes> implements ChatThreadAttributes {
  public id!: number;
  public userId!: number;
  public messages!: { sender: string; text: string }[];
  public createdAt!: Date;
  public updatedAt!: Date;

  public static initModel(sequelize: Sequelize) {
    ChatThread.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        userId: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        messages: {
          type: DataTypes.JSON,
          allowNull: false,
        },
        createdAt: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW,
        },
        updatedAt: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW,
        },
      },
      {
        sequelize,
        modelName: 'ChatThread',
      }
    );
  }

  public static async createThread(data: ChatThreadCreationAttributes): Promise<ChatThread> {
    return await ChatThread.create(data);
  }

  public static async findThreadByPk(id: number): Promise<ChatThread | null> {
    return await ChatThread.findByPk(id);
  }

  public static async findAllThreads(options: any): Promise<ChatThread[]> {
    return await ChatThread.findAll(options);
  }
}

export { ChatThread };
