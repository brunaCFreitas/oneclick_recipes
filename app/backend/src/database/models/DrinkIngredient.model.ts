import { DataTypes, Model } from 'sequelize';
import sequelize from '.';

class DrinkIngredientModel extends Model {
  declare idIngredient: number;
  declare strIngredient1: string;
}

DrinkIngredientModel.init(
  {
    idIngredient: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.NUMBER,
    },
    strIngredient1: { type: DataTypes.STRING },
  },
  {
    tableName: 'drinksIngredients',
    sequelize,
    timestamps: false,
    underscored: false,
  },
);

export default DrinkIngredientModel;
