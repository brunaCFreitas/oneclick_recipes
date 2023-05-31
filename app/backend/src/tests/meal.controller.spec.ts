import * as sinon from 'sinon';
import * as chai from 'chai';

// @ts-ignore
import chaiHttp = require('chai-http');

import { Response } from 'superagent';
import { app } from '../app';

import MealService from '../services/Meal.service';
import MealCategoryService from '../services/MealCategory.service';
import MealIngredientService from '../services/MealIngredient.service';

import { 
  findById, findByName, findByFirstLetter, 
  findByArea, findByCategory, findByIngredient, 
  findRandom, findAllAreas, findAllCategories, 
  findAllIngredients 
} from './mocks/meal.mock';
  
import 'mocha';

const { expect } = chai;

chai.use(chaiHttp);

describe('MealController', () => {
  let chaiHttpResponse: Response;

  afterEach(() => {
    sinon.restore();
  });

  it('findById - retorna uma meal de acordo com id', async () => {
    // @ts-ignore
    sinon.stub(MealService, 'findById').resolves(findById);

    chaiHttpResponse = await chai.request(app)
      .get('/meals/52978');

    const { status, body } = chaiHttpResponse

    expect(status).to.be.equal(200);
    expect(body).to.be.deep.equal({ meals: [findById] });
  });

  it('findByName - retorna uma meal de acordo com o nome', async () => {
    // @ts-ignore
    sinon.stub(MealService, 'findByName').resolves(findByName);

    chaiHttpResponse = await chai.request(app)
      .get('/meals/name?q=Eton');

    const { status, body } = chaiHttpResponse

    expect(status).to.be.equal(200);
    expect(body).to.be.deep.equal({ meals: findByName });
  });

  it('findByFirstLetter - retorna as meals de acordo com a primeira letra', async () => {
    // @ts-ignore
    sinon.stub(MealService, 'findByFirstLetter').resolves(findByFirstLetter);

    chaiHttpResponse = await chai.request(app)
      .get('/meals/letter?q=L');

    const { status, body } = chaiHttpResponse

    expect(status).to.be.equal(200);
    expect(body).to.be.deep.equal({ meals: findByFirstLetter });
  });

  it('findByArea - retorna as meals de acordo com a região', async () => {
    // @ts-ignore
    sinon.stub(MealService, 'findByArea').resolves(findByArea);

    chaiHttpResponse = await chai.request(app)
      .get('/meals/area?q=Japanese');

    const { status, body } = chaiHttpResponse

    expect(status).to.be.equal(200);
    expect(body).to.be.deep.equal({ meals: findByArea });
  });

  it('findByCategory - retorna as meals de acordo com a categoria', async () => {
    // @ts-ignore
    sinon.stub(MealService, 'findByCategory').resolves(findByCategory);

    chaiHttpResponse = await chai.request(app)
      .get('/meals/category?q=Beef');

    const { status, body } = chaiHttpResponse

    expect(status).to.be.equal(200);
    expect(body).to.be.deep.equal({ meals: findByCategory });
  });

  it('findByIngredient - retorna as meals de acordo com o ingrediente', async () => {
    // @ts-ignore
    sinon.stub(MealService, 'findByIngredient').resolves(findByIngredient);

    chaiHttpResponse = await chai.request(app)
      .get('/meals/ingredient?q=Pork');

    const { status, body } = chaiHttpResponse

    expect(status).to.be.equal(200);
    expect(body).to.be.deep.equal({ meals: findByIngredient });
  });

  it('findRandom - retorna uma meal de forma aleatória', async () => {
    // @ts-ignore
    sinon.stub(MealService, 'findRandom').resolves(findRandom);

    chaiHttpResponse = await chai.request(app)
      .get('/meals/random');

    const { status, body } = chaiHttpResponse

    expect(status).to.be.equal(200);
    expect(body).to.be.deep.equal({ meals: findRandom });
  });

  it('findAllAreas - retorna todas as categorias das meals', async () => {
    // @ts-ignore
    sinon.stub(MealService, 'findAllAreas').resolves(findAllAreas);

    chaiHttpResponse = await chai.request(app)
      .get('/meals/areas');

    const { status, body } = chaiHttpResponse

    expect(status).to.be.equal(200);
    expect(body).to.be.deep.equal({ meals: findAllAreas });
  });

  it('findAllCategories - retorna todas as categorias das meals', async () => {
    // @ts-ignore
    sinon.stub(MealCategoryService, 'findAll').resolves(findAllCategories);

    chaiHttpResponse = await chai.request(app)
      .get('/meals/categories');

    const { status, body } = chaiHttpResponse

    expect(status).to.be.equal(200);
    expect(body).to.be.deep.equal({ meals: findAllCategories });
  });
  
  it('findAllIngredients - retorna todos os ingredientes das meals', async () => {
    // @ts-ignore
    sinon.stub(MealIngredientService, 'findAll').resolves(findAllIngredients);

    chaiHttpResponse = await chai.request(app)
      .get('/meals/ingredients');

    const { status, body } = chaiHttpResponse

    expect(status).to.be.equal(200);
    expect(body).to.be.deep.equal({ meals: findAllIngredients });
  });
});
