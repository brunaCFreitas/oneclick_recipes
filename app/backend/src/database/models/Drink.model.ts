import { DataTypes, Model } from 'sequelize';
import sequelize from '.';

class DrinkModel extends Model {
  declare idDrink: string;
  declare strDrink: string;
  declare strCategory: string;
  declare strAlcoholic: string;
  declare strGlass: string;
  declare strInstructions: string;
  declare strDrinkThumb: string;
  declare strIngredient1: string;
  declare strIngredient2: string;
  declare strIngredient3: string;
  declare strIngredient4: string;
  declare strIngredient5: string;
  declare strIngredient6: string;
  declare strIngredient7: string;
  declare strIngredient8: string;
  declare strIngredient9: string;
  declare strIngredient10: string;
  declare strIngredient11: string;
  declare strIngredient12: string;
  declare strIngredient13: string;
  declare strIngredient14: string;
  declare strIngredient15: string;
  declare strMeasure1: string;
  declare strMeasure2: string;
  declare strMeasure3: string;
  declare strMeasure4: string;
  declare strMeasure5: string;
  declare strMeasure6: string;
  declare strMeasure7: string;
  declare strMeasure8: string;
  declare strMeasure9: string;
  declare strMeasure10: string;
  declare strMeasure11: string;
  declare strMeasure12: string;
  declare strMeasure13: string;
  declare strMeasure14: string;
  declare strMeasure15: string;
  declare dateModified: string;
}

DrinkModel.init(
  {
    idDrink: {
      allowNull: false,
      autoIncrement: false,
      primaryKey: true,
      type: DataTypes.STRING,
    },
    strDrink: { type: DataTypes.STRING },
    strCategory: { type: DataTypes.STRING },
    strAlcoholic: { type: DataTypes.STRING },
    strGlass: { type: DataTypes.STRING },
    strInstructions: { type: DataTypes.TEXT },
    strDrinkThumb: { type: DataTypes.STRING },
    strIngredient1: { type: DataTypes.STRING },
    strIngredient2: { type: DataTypes.STRING },
    strIngredient3: { type: DataTypes.STRING },
    strIngredient4: { type: DataTypes.STRING },
    strIngredient5: { type: DataTypes.STRING },
    strIngredient6: { type: DataTypes.STRING },
    strIngredient7: { type: DataTypes.STRING },
    strIngredient8: { type: DataTypes.STRING },
    strIngredient9: { type: DataTypes.STRING },
    strIngredient10: { type: DataTypes.STRING },
    strIngredient11: { type: DataTypes.STRING },
    strIngredient12: { type: DataTypes.STRING },
    strIngredient13: { type: DataTypes.STRING },
    strIngredient14: { type: DataTypes.STRING },
    strIngredient15: { type: DataTypes.STRING },
    strMeasure1: { type: DataTypes.STRING },
    strMeasure2: { type: DataTypes.STRING },
    strMeasure3: { type: DataTypes.STRING },
    strMeasure4: { type: DataTypes.STRING },
    strMeasure5: { type: DataTypes.STRING },
    strMeasure6: { type: DataTypes.STRING },
    strMeasure7: { type: DataTypes.STRING },
    strMeasure8: { type: DataTypes.STRING },
    strMeasure9: { type: DataTypes.STRING },
    strMeasure10: { type: DataTypes.STRING },
    strMeasure11: { type: DataTypes.STRING },
    strMeasure12: { type: DataTypes.STRING },
    strMeasure13: { type: DataTypes.STRING },
    strMeasure14: { type: DataTypes.STRING },
    strMeasure15: { type: DataTypes.STRING },
    dateModified: { type: DataTypes.STRING },
  },
  {
    tableName: 'drinks',
    sequelize,
    timestamps: false,
    underscored: false,
  },
);

export default DrinkModel;
