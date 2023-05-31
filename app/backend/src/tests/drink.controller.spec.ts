import * as sinon from 'sinon';
import * as chai from 'chai';

// @ts-ignore
import chaiHttp = require('chai-http');

import { Response } from 'superagent';
import { app } from '../app';

import DrinkService from '../services/Drink.service';
import DrinkCategoryService from '../services/DrinkCategory.service';
import DrinkIngredientService from '../services/DrinkIngredient.service';

import { 
  findById, findByName, findByFirstLetter, 
  findByCategory, findByIngredient, findRandom,
  findAllCategories, findAllIngredients 
} from './mocks/drink.mock';

import 'mocha';

const { expect } = chai;

chai.use(chaiHttp);

describe('DrinkController', () => {
  let chaiHttpResponse: Response;

  afterEach(() => {
    sinon.restore();
  });

  it('findById - retorna um drink de acordo com id', async () => {
    // @ts-ignore
    sinon.stub(DrinkService, 'findById').resolves(findById);

    chaiHttpResponse = await chai.request(app)
      .get('/drinks/15997');

    const { status, body } = chaiHttpResponse

    expect(status).to.be.equal(200);
    expect(body).to.be.deep.equal({ drinks: [findById] });
  });

  it('findByName - retorna um drink de acordo com o nome', async () => {
    // @ts-ignore
    sinon.stub(DrinkService, 'findByName').resolves(findByName);

    chaiHttpResponse = await chai.request(app)
      .get('/drinks/name?q=Zorro');

    const { status, body } = chaiHttpResponse

    expect(status).to.be.equal(200);
    expect(body).to.be.deep.equal({ drinks: findByName });
  });

  it('findByFirstLetter - retorna os drinks de acordo com a primeira letra', async () => {
    // @ts-ignore
    sinon.stub(DrinkService, 'findByFirstLetter').resolves(findByFirstLetter);

    chaiHttpResponse = await chai.request(app)
      .get('/drinks/letter?q=M');

    const { status, body } = chaiHttpResponse

    expect(status).to.be.equal(200);
    expect(body).to.be.deep.equal({ drinks: findByFirstLetter });
  });

  it('findByCategory - retorna os drinks de acordo com a categoria', async () => {
    // @ts-ignore
    sinon.stub(DrinkService, 'findByCategory').resolves(findByCategory);

    chaiHttpResponse = await chai.request(app)
      .get('/drinks/category?q=Cocktail');

    const { status, body } = chaiHttpResponse

    expect(status).to.be.equal(200);
    expect(body).to.be.deep.equal({ drinks: findByCategory });
  });

  it('findByIngredient - retorna os drinks de acordo com o ingrediente', async () => {
    // @ts-ignore
    sinon.stub(DrinkService, 'findByIngredient').resolves(findByIngredient);

    chaiHttpResponse = await chai.request(app)
      .get('/drinks/ingredient?q=Amaretto');

    const { status, body } = chaiHttpResponse

    expect(status).to.be.equal(200);
    expect(body).to.be.deep.equal({ drinks: findByIngredient });
  });

  it('findRandom - retorna um drink de forma aleatória', async () => {
    // @ts-ignore
    sinon.stub(DrinkService, 'findRandom').resolves(findRandom);

    chaiHttpResponse = await chai.request(app)
      .get('/drinks/random');

    const { status, body } = chaiHttpResponse

    expect(status).to.be.equal(200);
    expect(body).to.be.deep.equal({ drinks: findRandom });
  });

  it('findAllCategories - retorna todas as categorias dos drinks', async () => {
    // @ts-ignore
    sinon.stub(DrinkCategoryService, 'findAll').resolves(findAllCategories);

    chaiHttpResponse = await chai.request(app)
      .get('/drinks/categories');

    const { status, body } = chaiHttpResponse

    expect(status).to.be.equal(200);
    expect(body).to.be.deep.equal({ drinks: findAllCategories });
  });
  
  it('findAllIngredients - retorna todos os ingredientes dos drinks', async () => {
    // @ts-ignore
    sinon.stub(DrinkIngredientService, 'findAll').resolves(findAllIngredients);

    chaiHttpResponse = await chai.request(app)
      .get('/drinks/ingredients');

    const { status, body } = chaiHttpResponse

    expect(status).to.be.equal(200);
    expect(body).to.be.deep.equal({ drinks: findAllIngredients });
  });
});
