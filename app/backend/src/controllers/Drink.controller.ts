import { Request, Response } from 'express';
import DrinkService from '../services/Drink.service';
import DrinkIngredientService from '../services/DrinkIngredient.service';
import DrinkCategoryService from '../services/DrinkCategory.service';

export default class DrinkController {
  public static async findById(req: Request, res: Response) {
    const { id } = req.params;
    const drink = await DrinkService.findById(id);

    res.status(200).json({ drinks: [drink] });
  }

  public static async findByName(req: Request, res: Response) {
    const { q } = req.query;
    const drinks = await DrinkService.findByName(q as string);

    res.status(200).json({ drinks });
  }

  public static async findByFirstLetter(req: Request, res: Response) {
    const { q } = req.query;
    const drinks = await DrinkService.findByFirstLetter(q as string);

    res.status(200).json({ drinks });
  }

  public static async findByCategory(req: Request, res: Response) {
    const { q } = req.query;
    const drinks = await DrinkService.findByCategory(q as string);

    res.status(200).json({ drinks });
  }

  public static async findByIngredient(req: Request, res: Response) {
    const { q } = req.query;
    const drinks = await DrinkService.findByIngredient(q as string);

    res.status(200).json({ drinks });
  }

  public static async findRandom(req: Request, res: Response) {
    const drinks = await DrinkService.findRandom();

    res.status(200).json({ drinks });
  }

  public static async findAllCategories(req: Request, res: Response) {
    const categories = await DrinkCategoryService.findAll();

    res.status(200).json({ drinks: categories });
  }

  public static async findAllIngredients(req: Request, res: Response) {
    const ingredients = await DrinkIngredientService.findAll();

    res.status(200).json({ drinks: ingredients });
  }
}
