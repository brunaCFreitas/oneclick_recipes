import { Router } from 'express';
import MealController from '../controllers/Meal.controller';

const mealsRouter = Router();

const {
  findById, findByName, findByFirstLetter, findRandom,
  findAllCategories, findAllAreas, findAllIngredients,
  findByIngredient, findByCategory, findByArea,
} = MealController;

mealsRouter
  .get('/name', findByName)
  .get('/letter', findByFirstLetter)
  .get('/random', findRandom)
  .get('/categories', findAllCategories)
  .get('/areas', findAllAreas)
  .get('/ingredients', findAllIngredients)
  .get('/ingredient', findByIngredient)
  .get('/category', findByCategory)
  .get('/area', findByArea)
  .get('/:id', findById);

export default mealsRouter;
