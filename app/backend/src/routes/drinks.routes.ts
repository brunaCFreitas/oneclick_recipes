import { Router } from 'express';
import DrinkController from '../controllers/Drink.controller';

const drinksRouter = Router();

const {
  findById, findByName, findByFirstLetter,
  findRandom, findAllCategories, findAllIngredients,
  findByIngredient, findByCategory,
} = DrinkController;

drinksRouter
  .get('/name', findByName)
  .get('/letter', findByFirstLetter)
  .get('/random', findRandom)
  .get('/categories', findAllCategories)
  .get('/ingredients', findAllIngredients)
  .get('/ingredient', findByIngredient)
  .get('/category', findByCategory)
  .get('/:id', findById);

export default drinksRouter;
