import { DataTypes, Model } from 'sequelize';
import sequelize from '.';
import DrinkModel from './Drink.model';
import UserModel from './User.model';

class DrinkRecipeInProgressModel extends Model {
  declare drink: DrinkModel;
  declare user: UserModel;
  declare idUser: number;
  declare idDrink: string;
  declare strIngredient1: boolean;
  declare strIngredient2: boolean;
  declare strIngredient3: boolean;
  declare strIngredient4: boolean;
  declare strIngredient5: boolean;
  declare strIngredient6: boolean;
  declare strIngredient7: boolean;
  declare strIngredient8: boolean;
  declare strIngredient9: boolean;
  declare strIngredient10: boolean;
  declare strIngredient11: boolean;
  declare strIngredient12: boolean;
  declare strIngredient13: boolean;
  declare strIngredient14: boolean;
  declare strIngredient15: boolean;
  declare isFinished: boolean;
}

DrinkRecipeInProgressModel.init(
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
    idDrink: {
      allowNull: false,
      type: DataTypes.STRING,
      primaryKey: true,
      autoIncrement: false,
      references: {
        model: 'drinks',
        key: 'idDrink',
      },
      onDelete: 'CASCADE',
    },
    strIngredient1: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    strIngredient2: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    strIngredient3: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    strIngredient4: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    strIngredient5: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    strIngredient6: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    strIngredient7: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    strIngredient8: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    strIngredient9: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    strIngredient10: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    strIngredient11: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    strIngredient12: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    strIngredient13: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    strIngredient14: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    strIngredient15: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    isFinished: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    tableName: 'drinksRecipeInProgress',
    sequelize,
    timestamps: false,
    underscored: false,
  },
);

DrinkModel.hasMany(DrinkRecipeInProgressModel, { foreignKey: 'idDrink', as: 'recipes' });
DrinkRecipeInProgressModel.belongsTo(DrinkModel, { foreignKey: 'idDrink', as: 'drink' });
UserModel.hasMany(DrinkRecipeInProgressModel, { foreignKey: 'idUser', as: 'drinkRecipes' });
DrinkRecipeInProgressModel.belongsTo(UserModel, { foreignKey: 'idUser', as: 'user' });

export default DrinkRecipeInProgressModel;
