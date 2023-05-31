import { DataTypes, Model } from 'sequelize';
import sequelize from '.';

class MealIngredientModel extends Model {
  declare idIngredient: string;
  declare strIngredient: string;
  declare strDescription: string;
  declare strType: string;
}

MealIngredientModel.init(
  {
    idIngredient: {
      allowNull: false,
      autoIncrement: false,
      primaryKey: true,
      type: DataTypes.STRING,
    },
    strIngredient: { type: DataTypes.STRING },
    strDescription: { type: DataTypes.TEXT },
    strType: { type: DataTypes.STRING },
  },
  {
    tableName: 'mealsIngredients',
    sequelize,
    timestamps: false,
    underscored: false,
  },
);

export default MealIngredientModel;
