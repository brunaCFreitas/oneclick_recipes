import { expect } from 'chai';
import * as sinon from 'sinon';
import * as chai from 'chai';

// @ts-ignore
import chaiAsPromised = require('chai-as-promised');

import DrinkRecipeInProgress from '../database/models/DrinkRecipeInProgress.model';
import MealRecipeInProgress from '../database/models/MealRecipeInProgress.model';
import RecipesDoneModel from '../database/models/RecipesDone.model';
import RecipesFavoritesModel from '../database/models/RecipesFavorites.model';

import DrinkRecipe from '../services/DrinkRecipe.service';
import MealRecipe from '../services/MealRecipe.service';
import RecipesDoneService from '../services/RecipesDone.service';
import RecipesFavoritesService from '../services/RecipesFavorite.service';

import {
  getDrinkStarted, getMealStarted,
  updateDrink, updateMeal,
  finishDrink, finishMeal, doneRecipe,
  createFavoriteRecipe, removeFavoriteRecipe, getAllFavorites,
} from './mocks/recipe.mock';

import 'mocha';

chai.use(chaiAsPromised);

describe('RecipeService', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('getFinishedRecipes - retorna a confirmação da finalização da receita', async () => {
    // @ts-ignore
    sinon.stub(RecipesDoneModel, 'findAll').resolves(doneRecipe);

    // @ts-ignore
    const result = await RecipesDoneService.getFinishedRecipes(1, 'meal');

    expect(result).to.be.deep.equal(doneRecipe)
  })

  describe('getRecipeInProgress', () => {
    it('retorna as informações para dar inicio a receita do drink', async () => {
      // @ts-ignore
      sinon.stub(DrinkRecipeInProgress, 'findOne').resolves(null);
      // @ts-ignore
      sinon.stub(DrinkRecipeInProgress, 'upsert').resolves(updateDrink);

      const result = await DrinkRecipe.getDrinkRecipeInProgress(1, '15997');

      expect(result).to.be.deep.equal(updateDrink)
    })

    it('retorna as informações do drink em progresso', async () => {
      // @ts-ignore
      sinon.stub(DrinkRecipeInProgress, 'findOne').resolves(getDrinkStarted);

      const result = await DrinkRecipe.getDrinkRecipeInProgress(1, '15997');

      expect(result).to.be.deep.equal(getDrinkStarted)
    })

    it('retorna as informações para dar inicio a receita da meal', async () => {
      // @ts-ignore
      sinon.stub(MealRecipeInProgress, 'findOne').resolves(null);
      // @ts-ignore
      sinon.stub(MealRecipeInProgress, 'upsert').resolves(updateMeal);

      const result = await MealRecipe.getMealRecipeInProgress(1, '52978');

      expect(result).to.be.deep.equal(updateMeal)
    })

    it('retorna as informações da meal em progresso', async () => {
      // @ts-ignore
      sinon.stub(MealRecipeInProgress, 'findOne').resolves(getMealStarted);

      const result = await MealRecipe.getMealRecipeInProgress(1, '52978');

      expect(result).to.be.deep.equal(getMealStarted)
    })
  })

  describe('updateRecipeInProgress', () => {
    it('retorna as informações atualizadas do drink', async () => {
      // @ts-ignore
      sinon.stub(DrinkRecipeInProgress, 'upsert').resolves(updateDrink);

      const result = await DrinkRecipe.updateDrinkRecipeInProgress(1, '15997', '', false);

      expect(result).to.be.deep.equal(updateDrink)
    })

    it('retorna as informações atualizadas da meal', async () => {
      // @ts-ignore
      sinon.stub(MealRecipeInProgress, 'upsert').resolves(updateMeal);

      const result = await MealRecipe.updateMealRecipeInProgress(1, '52978', '', false);

      expect(result).to.be.deep.equal(updateMeal)
    })
  })


  describe('finishRecipeInProgress', () => {
    it('retorna a confirmação da finalização do drink em progresso', async () => {
      // @ts-ignore
      sinon.stub(DrinkRecipeInProgress, 'update').resolves([1]);
      // @ts-ignore
      sinon.stub(RecipesDoneModel, 'upsert');

      // @ts-ignore
      const result = await DrinkRecipe.finishDrinkRecipeInProgress(finishDrink);

      expect(result).to.be.deep.equal([1])
    })

    it('retorna a confirmação da finalização da meal em progresso', async () => {
      // @ts-ignore
      sinon.stub(MealRecipeInProgress, 'update').resolves([1]);
      // @ts-ignore
      sinon.stub(RecipesDoneModel, 'upsert');

      // @ts-ignore
      const result = await MealRecipe.finishMealRecipeInProgress(finishMeal);

      expect(result).to.be.deep.equal([1])
    })

    it('retorna as receitas finalizadas', async () => {
      // @ts-ignore
      sinon.stub(RecipesDoneModel, 'findAll').resolves(doneRecipe);

      // @ts-ignore
      const result = await RecipesDoneService.getFinishedRecipes(1, '');

      expect(result).to.be.deep.equal(doneRecipe)
    })
  })

  describe('favoriteRecipe', () => {
    it('adiciona a receita aos favoritos', async () => {
      // @ts-ignore
      const createStub = sinon.stub(RecipesFavoritesModel, 'create');

      await RecipesFavoritesService.addFavoriteRecipe(createFavoriteRecipe)

      expect(createStub.calledWith(createFavoriteRecipe)).to.be.true;
    })

    it('remove a receita dos favoritos', async () => {
      // @ts-ignore
      const removeStub = sinon.stub(RecipesFavoritesModel, 'destroy');
      const { idUser, idRecipe, type } = removeFavoriteRecipe

      await RecipesFavoritesService.removeFavoriteRecipe(idUser, idRecipe, type)

      expect(removeStub.calledWith({
        where: {
          idUser: +idUser,
          idRecipe,
          type,
        }
      })).to.be.true;
    })

    it('retorna todos os favoritos', async () => {
      // @ts-ignore
      sinon.stub(RecipesFavoritesModel, 'create').resolves(createFavoriteRecipe);
      // @ts-ignore
      sinon.stub(RecipesFavoritesModel, 'findAll').resolves(getAllFavorites);

      const result = await RecipesFavoritesService.getFavoritesRecipes('1', 'meal')

      expect(result).to.be.deep.equal(getAllFavorites)
    })
  })
});
