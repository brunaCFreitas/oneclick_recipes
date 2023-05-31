import { expect } from 'chai';
import * as sinon from 'sinon';
import * as chai from 'chai';

// @ts-ignore
import chaiAsPromised = require('chai-as-promised');

import MealModel from '../database/models/Meal.model';
import MealCategoryModel from '../database/models/MealCategory.model';
import MealIngredientModel from '../database/models/MealIngredient.model';

import MealService from '../services/Meal.service';
import MealCategoryService from '../services/MealCategory.service';
import MealIngredientService from '../services/MealIngredient.service';

import {
  findById, findByName, findByFirstLetter,
  findByArea, findByCategory, findByIngredient,
  findRandom, findAllAreas, findAllCategories,
  findAllIngredients, findAllMeals
} from './mocks/meal.mock';

import 'mocha';

chai.use(chaiAsPromised);

describe('MealService', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('findById - retorna uma meal de acordo com id', async () => {
    // @ts-ignore
    sinon.stub(MealModel, 'findOne').resolves(findById);

    const result = await MealService.findById('52978');

    expect(result).to.be.deep.equal(findById)
  })

  it('findRandom - retorna uma meal de forma aleatória', async () => {
    // @ts-ignore
    sinon.stub(MealModel, 'findAll').resolves(findRandom);

    const result = await MealService.findRandom();

    expect(result).to.be.deep.equal(findRandom)
  })

  it('findAllAreas - retorna toda as regiões das meals', async () => {
    // @ts-ignore
    sinon.stub(MealModel, 'findAll').resolves(findAllAreas);

    const result = await MealService.findAllAreas();

    expect(result).to.be.deep.equal(findAllAreas)
  })

  it('findAllCategories - retorna todas as categorias das meals', async () => {
    // @ts-ignore
    sinon.stub(MealCategoryModel, 'findAll').resolves(findAllCategories);

    const result = await MealCategoryService.findAll();

    expect(result).to.be.deep.equal(findAllCategories)
  })

  it('findAllIngredients - retorna todos os ingredientes das meals', async () => {
    // @ts-ignore
    sinon.stub(MealIngredientModel, 'findAll').resolves(findAllIngredients);

    const result = await MealIngredientService.findAll();

    expect(result).to.be.deep.equal(findAllIngredients)
  })

  describe('findByName', () => {
    it('retorna uma meal de acordo com o nome', async () => {
      // @ts-ignore
      sinon.stub(MealModel, 'findAll').resolves(findByName);

      const result = await MealService.findByName('Eton');

      expect(result).to.be.deep.equal(findByName)
    })

    it('retorna todas as meals caso o valor da query seja vazio', async () => {
      // @ts-ignore
      sinon.stub(MealModel, 'findAll').resolves(findAllMeals);

      const result = await MealService.findByName();

      expect(result).to.be.deep.equal(findAllMeals)
    })
  })

  describe('findByFirstLetter', () => {
    it('retorna as meals de acordo com a primeira letra', async () => {
      // @ts-ignore
      sinon.stub(MealModel, 'findAll').resolves(findByFirstLetter);
  
      const result = await MealService.findByFirstLetter('L');
  
      expect(result).to.be.deep.equal(findByFirstLetter)
    })

    it('retorna todas as meals caso o valor da query seja vazio', async () => {
      // @ts-ignore
      sinon.stub(MealModel, 'findAll').resolves(findAllMeals);
  
      const result = await MealService.findByFirstLetter();
  
      expect(result).to.be.deep.equal(findAllMeals)
    })
  })

  describe('findByArea', () => {
    it('retorna as meals de acordo com a região', async () => {
      // @ts-ignore
      sinon.stub(MealModel, 'findAll').resolves(findByArea);
  
      const result = await MealService.findByArea('Japanese');
  
      expect(result).to.be.deep.equal(findByArea)
    })

    it('retorna um array vazio caso o valor da query seja vazio', async () => {
      // @ts-ignore
      sinon.stub(MealModel, 'findAll').resolves([]);
  
      const result = await MealService.findByArea();
  
      expect(result).to.be.deep.equal([])
    })
  })

  describe('findByCategory', () => {
    it('retorna as meals de acordo com a categoria', async () => {
      // @ts-ignore
      sinon.stub(MealModel, 'findAll').resolves(findByCategory);
  
      const result = await MealService.findByCategory('Beef');
  
      expect(result).to.be.deep.equal(findByCategory)
    })

    it('retorna um array vazio caso o valor da query seja vazio', async () => {
      // @ts-ignore
      sinon.stub(MealModel, 'findAll').resolves([]);
  
      const result = await MealService.findByCategory();
  
      expect(result).to.be.deep.equal([])
    })
  })

  describe('findByIngredient', () => {
    it('retorna as meals de acordo com o ingrediente', async () => {
      // @ts-ignore
      sinon.stub(MealModel, 'findAll').resolves(findByIngredient);
  
      const result = await MealService.findByIngredient('Pork');
  
      expect(result).to.be.deep.equal(findByIngredient)
    })

    it('retorna um array vazio caso o valor da query seja vazio', async () => {
      // @ts-ignore
      sinon.stub(MealModel, 'findAll').resolves([]);
  
      const result = await MealService.findByIngredient();
  
      expect(result).to.be.deep.equal([])
    })
  })
});
