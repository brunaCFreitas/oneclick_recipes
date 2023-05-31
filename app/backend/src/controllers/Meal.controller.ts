import { Request, Response } from 'express';
import MealService from '../services/Meal.service';
import MealCategoryService from '../services/MealCategory.service';
import MealIngredientService from '../services/MealIngredient.service';

export default class MealController {
  public static async findById(req: Request, res: Response) {
    const { id } = req.params;
    const meal = await MealService.findById(id);

    res.status(200).json({ meals: [meal] });
  }

  public static async findByName(req: Request, res: Response) {
    const { q } = req.query;
    const meals = await MealService.findByName(q as string);

    res.status(200).json({ meals });
  }

  public static async findByFirstLetter(req: Request, res: Response) {
    const { q } = req.query;
    const meals = await MealService.findByFirstLetter(q as string);

    res.status(200).json({ meals });
  }

  public static async findByCategory(req: Request, res: Response) {
    const { q } = req.query;
    const meals = await MealService.findByCategory(q as string);

    res.status(200).json({ meals });
  }

  public static async findByArea(req: Request, res: Response) {
    const { q } = req.query;
    const meals = await MealService.findByArea(q as string);

    res.status(200).json({ meals });
  }

  public static async findByIngredient(req: Request, res: Response) {
    const { q } = req.query;
    const meals = await MealService.findByIngredient(q as string);

    res.status(200).json({ meals });
  }

  public static async findRandom(req: Request, res: Response) {
    const meals = await MealService.findRandom();

    res.status(200).json({ meals });
  }

  public static async findAllIngredients(req: Request, res: Response) {
    const ingredients = await MealIngredientService.findAll();

    res.status(200).json({ meals: ingredients });
  }

  public static async findAllCategories(req: Request, res: Response) {
    const categories = await MealCategoryService.findAll();

    res.status(200).json({ meals: categories });
  }

  public static async findAllAreas(req: Request, res: Response) {
    const areas = await MealService.findAllAreas();

    res.status(200).json({ meals: areas });
  }
}
