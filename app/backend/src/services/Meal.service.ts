import { Op, Sequelize } from 'sequelize';
import MealModel from '../database/models/Meal.model';

export default class MealService {
  public static async findById(id: string) {
    return MealModel.findOne({
      where: { idMeal: id },
    });
  }

  public static async findByName(name = '') {
    return MealModel.findAll({
      where: {
        strMeal: {
          [Op.like]: `%${name}%`,
        },
      },
    });
  }

  public static async findByFirstLetter(letter = '') {
    return MealModel.findAll({
      where: {
        strMeal: {
          [Op.like]: `${letter}%`,
        },
      },
    });
  }

  public static async findByCategory(category = '') {
    return MealModel.findAll({
      where: {
        strCategory: category,
      },
    });
  }

  public static async findByArea(area = '') {
    return MealModel.findAll({
      where: {
        strArea: area,
      },
      attributes: ['strMeal', 'strMealThumb', 'idMeal'],
    });
  }

  public static async findRandom() {
    return MealModel.findAll({
      order: Sequelize.literal('RAND()'),
      limit: 1,
    });
  }

  public static async findAllAreas() {
    return MealModel.findAll({
      attributes: [
        [Sequelize.fn('DISTINCT', Sequelize.col('strArea')), 'strArea'],
      ],
      order: [['strArea', 'ASC']],
    });
  }

  public static async findByIngredient(ingredient = '') {
    return MealModel.findAll({
      where: {
        strIngredient1: ingredient,
      },
    });
  }
}
