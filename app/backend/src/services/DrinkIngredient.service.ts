import DrinkIngredientModel from '../database/models/DrinkIngredient.model';

export default class DrinkIngredientService {
  public static async findAll() {
    return DrinkIngredientModel.findAll();
  }
}
