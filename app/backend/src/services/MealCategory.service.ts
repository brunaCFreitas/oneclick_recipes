import MealCategoryModel from '../database/models/MealCategory.model';

export default class MealCategoryService {
  public static async findAll() {
    return MealCategoryModel.findAll();
  }
}
