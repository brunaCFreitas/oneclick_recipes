import { DataTypes, Model } from 'sequelize';
// eslint-disable-next-line import/no-unresolved
import sequelize from '.';

export interface UserAttributes {
  id: number;
  username: string;
  email: string;
  password: string;
}

export type UserCreateAttr = Omit<UserAttributes, 'id'>;

class UserModel extends Model<UserAttributes, UserCreateAttr> {
  declare id: number;

  declare username: string;

  declare email: string;

  declare password: string;
}

UserModel.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    username: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    email: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING,
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  },
  {
    tableName: 'users',
    sequelize,
    timestamps: false,
    underscored: true,
  },
);

export default UserModel;
