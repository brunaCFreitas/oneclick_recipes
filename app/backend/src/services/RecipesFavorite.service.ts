import RecipesFavoritesModel from '../database/models/RecipesFavorites.model';
import { RecipeFavorite } from '../dtos/recipe/recipeFavorite.dto';

export default class RecipesFavoritesService {
  public static async getFavoritesRecipes(idUser: string, type?: string) {
    return RecipesFavoritesModel.findAll({
      where: {
        idUser: +idUser,
        ...(type && { type }),
      },
    });
  }

  public static async addFavoriteRecipe(recipe: RecipeFavorite) {
    await RecipesFavoritesModel.create(recipe);
  }

  public static async removeFavoriteRecipe(idUser: string, idRecipe: string, type: string) {
    await RecipesFavoritesModel.destroy({
      where: {
        idUser: +idUser,
        idRecipe,
        type,
      },
    });
  }
}
