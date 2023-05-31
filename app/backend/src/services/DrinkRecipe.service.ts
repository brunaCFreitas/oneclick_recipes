import DrinkRecipeInProgressModel from '../database/models/DrinkRecipeInProgress.model';
import RecipesDoneModel from '../database/models/RecipesDone.model';
import { RecipeDone } from '../dtos/recipe/recipeDone.dto';

export default class DrinkRecipeService {
  public static async getDrinkRecipeInProgress(idUser: number, idDrink: string) {
    const drinkRecipe = await DrinkRecipeInProgressModel.findOne({
      where: {
        idDrink,
        idUser,
        isFinished: false,
      },
      include: [
        { association: 'drink' },
      ],
    });
    if (!drinkRecipe) {
      return this.updateDrinkRecipeInProgress(idUser, idDrink, 'strIngredient1', false);
    }
    return drinkRecipe;
  }

  public static async updateDrinkRecipeInProgress(
    idUser: number,
    idDrink: string,
    idField: string,
    value: boolean,
  ) {
    return DrinkRecipeInProgressModel.upsert(
      {
        idDrink,
        idUser,
        [idField]: value,
      },
    );
  }

  public static async finishDrinkRecipeInProgress(recipe: RecipeDone) {
    const { idRecipe: idDrink, idUser } = recipe;
    const drinkRecipe = await DrinkRecipeInProgressModel.update(
      { isFinished: true },
      {
        where: {
          idDrink,
          idUser,
          isFinished: false,
        },
      },
    );
    await RecipesDoneModel.upsert(recipe);
    return drinkRecipe;
  }
}
