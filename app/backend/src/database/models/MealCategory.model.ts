import { DataTypes, Model } from 'sequelize';
import sequelize from '.';

class MealCategoryModel extends Model {
  declare idCategory: string;
  declare strCategory: string;
  declare strCategoryThumb: string;
  declare strCategoryDescription: string;
}

MealCategoryModel.init(
  {
    idCategory: {
      allowNull: false,
      autoIncrement: false,
      primaryKey: true,
      type: DataTypes.STRING,
    },
    strCategory: { type: DataTypes.STRING },
    strCategoryThumb: { type: DataTypes.STRING },
    strCategoryDescription: { type: DataTypes.TEXT },
  },
  {
    tableName: 'mealsCategories',
    sequelize,
    timestamps: false,
    underscored: false,
  },
);

export default MealCategoryModel;
