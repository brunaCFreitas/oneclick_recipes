import { Op, Sequelize } from 'sequelize';
import DrinkModel from '../database/models/Drink.model';

export default class DrinkService {
  public static async findById(id: string) {
    return DrinkModel.findOne({
      where: { idDrink: id },
    });
  }

  public static async findByName(name = '') {
    return DrinkModel.findAll({
      where: {
        strDrink: {
          [Op.like]: `%${name}%`,
        },
      },
    });
  }

  public static async findByFirstLetter(letter = '') {
    return DrinkModel.findAll({
      where: {
        strDrink: {
          [Op.like]: `${letter}%`,
        },
      },
    });
  }

  public static async findByCategory(category = '') {
    return DrinkModel.findAll({
      where: {
        strCategory: category,
      },
    });
  }

  public static async findRandom() {
    return DrinkModel.findAll({
      order: Sequelize.literal('RAND()'),
      limit: 1,
    });
  }

  public static async findByIngredient(ingredient = '') {
    return DrinkModel.findAll({
      where: {
        strIngredient1: ingredient,
      },
    });
  }
}
