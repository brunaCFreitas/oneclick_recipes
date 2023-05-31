import * as sinon from 'sinon';
import * as chai from 'chai';
import * as jwt from '../utils/auth'

// @ts-ignore
import chaiHttp = require('chai-http');

import { Response } from 'superagent';
import { app } from '../app';

import DrinkRecipe from '../services/DrinkRecipe.service';
import MealRecipe from '../services/MealRecipe.service';
import RecipesDoneService from '../services/RecipesDone.service';
import RecipesFavoritesService from '../services/RecipesFavorite.service';

import {
  getDrinkStarted, getMealStarted,
  updateDrink, updateMeal,
  bodyFinishDrink, bodyFinishMeal, doneRecipe,
  createFavoriteRecipe, removeFavoriteRecipe, getAllFavorites,
} from './mocks/recipe.mock';

import 'mocha';

const { expect } = chai;

chai.use(chaiHttp);

describe('RecipeController', () => {
  let chaiHttpResponse: Response;

  afterEach(() => {
    sinon.restore();
  });

  describe('getRecipeInProgress', () => {
    it('retorna as informações para dar inicio a receita do drink', async () => {
      // @ts-ignore
      sinon.stub(DrinkRecipe, 'getDrinkRecipeInProgress').resolves(updateDrink);
      sinon.stub(jwt, 'verifyToken').returns({ id: 1, message: 'test' })

      chaiHttpResponse = await chai.request(app)
        .get('/recipes/drinks/in-progress/15997');

      const { status, body } = chaiHttpResponse

      expect(status).to.be.equal(200);
      expect(body).to.be.deep.equal(updateDrink);
    });

    it('retorna as informações para dar inicio a receita da meal', async () => {
      // @ts-ignore
      sinon.stub(MealRecipe, 'getMealRecipeInProgress').resolves(updateMeal);
      sinon.stub(jwt, 'verifyToken').returns({ id: 1, message: 'test' })

      chaiHttpResponse = await chai.request(app)
        .get('/recipes/meals/in-progress/52978');

      const { status, body } = chaiHttpResponse

      expect(status).to.be.equal(200);
      expect(body).to.be.deep.equal(updateMeal);
    })
  })

  describe('updateRecipeInProgress', () => {
    it('retorna a confirmação de atualização do drink em progresso', async () => {
      // @ts-ignore
      sinon.stub(DrinkRecipe, 'updateDrinkRecipeInProgress').resolves(getDrinkStarted);
      sinon.stub(jwt, 'verifyToken').returns({ id: 1, message: 'test' })

      chaiHttpResponse = await chai.request(app)
        .patch('/recipes/drinks/in-progress/15997');

      const { status, body } = chaiHttpResponse

      expect(status).to.be.equal(200);
      expect(body).to.be.deep.equal({ message: 'ok' });
    });

    it('retorna a confirmação de atualização da meal em progresso', async () => {
      // @ts-ignore
      sinon.stub(MealRecipe, 'updateMealRecipeInProgress').resolves(getMealStarted);
      sinon.stub(jwt, 'verifyToken').returns({ id: 1, message: 'test' })

      chaiHttpResponse = await chai.request(app)
        .patch('/recipes/meals/in-progress/52978');

      const { status, body } = chaiHttpResponse

      expect(status).to.be.equal(200);
      expect(body).to.be.deep.equal({ message: 'ok' });
    });
  })


  describe('finishRecipeInProgress', () => {
    it('retorna a confirmação de finalização do drink em progresso', async () => {
      // @ts-ignore
      const finishDrink = sinon.stub(DrinkRecipe, 'finishDrinkRecipeInProgress');
      sinon.stub(jwt, 'verifyToken').returns({ id: 1, message: 'test' })

      chaiHttpResponse = await chai.request(app)
        .post('/recipes/in-progress/15997/finish')
        .send(bodyFinishDrink);

      const { status, body } = chaiHttpResponse

      // @ts-ignore
      expect(finishDrink.calledWith({
        ...bodyFinishDrink,
        idUser: 1,
        idRecipe: '15997'
      })).to.be.true;
      expect(status).to.be.equal(200);
      expect(body).to.be.deep.equal({ message: 'ok' });
    });

    it('retorna a confirmação de finalização da meal em progresso', async () => {
      // @ts-ignore
      const finishMeal = sinon.stub(MealRecipe, 'finishMealRecipeInProgress');
      sinon.stub(jwt, 'verifyToken').returns({ id: 1, message: 'test' })

      chaiHttpResponse = await chai.request(app)
        .post('/recipes/in-progress/52978/finish')
        .send(bodyFinishMeal);

      const { status, body } = chaiHttpResponse

      // @ts-ignore
      expect(finishMeal.calledWith({
        ...bodyFinishMeal,
        idUser: 1,
        idRecipe: '52978'
      })).to.be.true;
      expect(status).to.be.equal(200);
      expect(body).to.be.deep.equal({ message: 'ok' });
    });

    it('retorna as receitas finalizadas', async () => {
      // @ts-ignore
      sinon.stub(RecipesDoneService, 'getFinishedRecipes').resolves(doneRecipe);
      sinon.stub(jwt, 'verifyToken').returns({ id: 1, message: 'test' })

      chaiHttpResponse = await chai.request(app)
        .get('/recipes/done');

      const { status, body } = chaiHttpResponse

      expect(status).to.be.equal(200);
      expect(body).to.be.deep.equal(doneRecipe);
    });
  })

  describe('favoriteRecipe', () => {
    it('adiciona a receita aos favoritos', async () => {
      // @ts-ignore
      sinon.stub(RecipesFavoritesService, 'addFavoriteRecipe').resolves(createFavoriteRecipe);
      sinon.stub(jwt, 'verifyToken').returns({ id: 1, message: 'test' })

      chaiHttpResponse = await chai.request(app)
        .post('/recipes/favorites/15997');

      const { status, body } = chaiHttpResponse

      expect(status).to.be.equal(200);
      expect(body).to.be.deep.equal({ message: 'ok' });
    });

    it('remove a receita dos favoritos', async () => {
      // @ts-ignore
      sinon.stub(RecipesFavoritesService, 'removeFavoriteRecipe').resolves(removeFavoriteRecipe);
      sinon.stub(jwt, 'verifyToken').returns({ id: 1, message: 'test' })

      chaiHttpResponse = await chai.request(app)
        .delete('/recipes/favorites/15997');

      const { status, body } = chaiHttpResponse

      expect(status).to.be.equal(200);
      expect(body).to.be.deep.equal({ message: 'ok' });
    });

    it('retorna todos os favoritos', async () => {
      // @ts-ignore
      sinon.stub(RecipesFavoritesService, 'getFavoritesRecipes').resolves(getAllFavorites);
      sinon.stub(jwt, 'verifyToken').returns({ id: 1, message: 'test' })

      chaiHttpResponse = await chai.request(app)
        .get('/recipes/favorites');

      const { status, body } = chaiHttpResponse

      expect(status).to.be.equal(200);
      expect(body).to.be.deep.equal(getAllFavorites);
    });
  })

  describe('error', () => {
    it('retorna a mensagem de token invalido', async () => {
      chaiHttpResponse = await chai.request(app)
        .get('/recipes/drinks/in-progress/15997')
        .set('Authorization', 'token');

      const { status, body } = chaiHttpResponse

      expect(status).to.be.equal(401);
      expect(body).to.be.deep.equal({ message: 'Token must be a valid token' });
    });

    it('retorna status de internal server error', async () => {
      // @ts-ignore
      sinon.stub(DrinkRecipe, 'getDrinkRecipeInProgress').rejects();
      sinon.stub(jwt, 'verifyToken').returns({ id: 1, message: 'test' })

      chaiHttpResponse = await chai.request(app)
        .get('/recipes/drinks/in-progress/15997')
        .set('Authorization', 'token');

      const { status, body } = chaiHttpResponse

      expect(status).to.be.equal(500);
    });
  })
});
