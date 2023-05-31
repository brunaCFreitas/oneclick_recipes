import { DataTypes, Model } from 'sequelize';
import sequelize from '.';
import MealModel from './Meal.model';
import UserModel from './User.model';

class MealRecipeInProgressModel extends Model {
  declare meal: MealModel;
  declare user: UserModel;
  declare idUser: number;
  declare idMeal: string;
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
  declare strIngredient16: boolean;
  declare strIngredient17: boolean;
  declare strIngredient18: boolean;
  declare strIngredient19: boolean;
  declare strIngredient20: boolean;
  declare isFinished: boolean;
}

MealRecipeInProgressModel.init(
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
    idMeal: {
      allowNull: false,
      type: DataTypes.STRING,
      primaryKey: true,
      autoIncrement: false,
      references: {
        model: 'meals',
        key: 'idMeal',
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
    strIngredient16: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    strIngredient17: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    strIngredient18: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    strIngredient19: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    strIngredient20: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    isFinished: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    tableName: 'mealsRecipeInProgress',
    sequelize,
    timestamps: false,
    underscored: false,
  },
);

MealModel.hasMany(MealRecipeInProgressModel, { foreignKey: 'idMeal', as: 'meal' });
MealRecipeInProgressModel.belongsTo(MealModel, { foreignKey: 'idMeal', as: 'meal' });
UserModel.hasMany(MealRecipeInProgressModel, { foreignKey: 'idUser', as: 'user' });
MealRecipeInProgressModel.belongsTo(UserModel, { foreignKey: 'idUser', as: 'user' });

export default MealRecipeInProgressModel;
