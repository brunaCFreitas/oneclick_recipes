import { DataTypes, Model } from 'sequelize';
import sequelize from '.';
import UserModel from './User.model';

class RecipesFavoritesModel extends Model {
  declare idUser: number;
  declare idRecipe: string;
  declare type: string;
  declare category: string;
  declare alcoholicOrNot: string;
  declare name: string;
  declare image: string;
  declare nationality: string;
  declare user: UserModel;
}

RecipesFavoritesModel.init(
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
    nationality: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  },
  {
    tableName: 'recipesFavorites',
    sequelize,
    timestamps: false,
    underscored: false,
  },
);

UserModel.hasMany(RecipesFavoritesModel, { foreignKey: 'idUser', as: 'recipesFavorites' });
RecipesFavoritesModel.belongsTo(UserModel, { foreignKey: 'idUser', as: 'user' });

export default RecipesFavoritesModel;
