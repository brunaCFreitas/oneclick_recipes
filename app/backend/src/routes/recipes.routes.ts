import { Router } from 'express';
import RecipeController from '../controllers/Recipe.controller';
import authVerify from '../middlewares/auth.middleware';

const recipesRouter = Router();

const {
  getMealRecipeInProgress, updateMealRecipeInProgress,
  getDrinkRecipeInProgress, updateDrinkRecipeInProgress,
  finishRecipeInProgress, getDoneRecipes, getFavoritesRecipes,
  addFavoriteRecipe, removeFavoriteRecipe,
} = RecipeController;

recipesRouter
  .get('/meals/in-progress/:idMeal', [authVerify, getMealRecipeInProgress])
  .patch('/meals/in-progress/:idMeal', [authVerify, updateMealRecipeInProgress])
  .get('/drinks/in-progress/:idDrink', [authVerify, getDrinkRecipeInProgress])
  .patch('/drinks/in-progress/:idDrink', [authVerify, updateDrinkRecipeInProgress])
  .post('/in-progress/:idRecipe/finish', [authVerify, finishRecipeInProgress])
  .get('/done', [authVerify, getDoneRecipes])
  .get('/favorites', [authVerify, getFavoritesRecipes])
  .post('/favorites/:idRecipe', [authVerify, addFavoriteRecipe])
  .delete('/favorites/:idRecipe', [authVerify, removeFavoriteRecipe]);

export default recipesRouter;
