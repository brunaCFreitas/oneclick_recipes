import { DataTypes, Model } from 'sequelize';
import sequelize from '.';
import UserModel from './User.model';

class RecipesDoneModel extends Model {
  declare idUser: number;
  declare idRecipe: string;
  declare type: string;
  declare category: string;
  declare alcoholicOrNot: string;
  declare name: string;
  declare image: string;
  declare doneDate: Date;
  declare nationality: string;
  declare tags: string;
  declare user: UserModel;
}

RecipesDoneModel.init(
  {
    idUser: {
      allowNull: false,
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: false,
      references: {
        model: 'users',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    idRecipe: {
      allowNull: false,
      type: DataTypes.STRING,
      primaryKey: true,
      autoIncrement: false,
    },
    type: {
      allowNull: false,
      type: DataTypes.STRING,
      primaryKey: true,
      autoIncrement: false,
    },
    category: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    alcoholicOrNot: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    image: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    doneDate: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    nationality: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    tags: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  },
  {
    tableName: 'recipesDone',
    sequelize,
    timestamps: false,
    underscored: false,
  },
);

UserModel.hasMany(RecipesDoneModel, { foreignKey: 'idUser', as: 'recipesDone' });
RecipesDoneModel.belongsTo(UserModel, { foreignKey: 'idUser', as: 'user' });

export default RecipesDoneModel;
