import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { renderWithRouterAndProviders } from './helpers/renderWith';
import Recipes from '../pages/Recipes';
import {
  foodResponse,
  drinksResponse,
  foodCategoriesResponse,
  drinksCategoriesResponse,
  foodBeefCategoryResponse,
  drinkOrdinaryCategoryResponse,
} from './mocks';

const getAllFoodsPath = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const getAllDrinksPath = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
const getFoodCategoriesPath = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
const getDrinkCategoriesPath = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
const getFoodByCategoryPath = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=Beef';
const getDrinkByCategoryPath = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Ordinary Drink';

const responseByPath = {
  [getAllFoodsPath]: foodResponse,
  [getAllDrinksPath]: drinksResponse,
  [getFoodCategoriesPath]: foodCategoriesResponse,
  [getDrinkCategoriesPath]: drinksCategoriesResponse,
  [getFoodByCategoryPath]: foodBeefCategoryResponse,
  [getDrinkByCategoryPath]: drinkOrdinaryCategoryResponse,
};

describe('Tela de Principal de Receitas', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch')
      .mockImplementation((param) => ({
        json: async () => {
          const response = responseByPath[param];
          if (!response) {
            throw new Error(`Mock not found for URL: "${param}"`);
          }
          return response;
        },
      }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Verfica se ao estar na tela de receitas com o pathname = "/meals", são renderizados apenas 12 cards de receitas de comida.', async () => {
    await act(async () => renderWithRouterAndProviders(<Recipes />, { initialEntries: ['/meals'] }));

    const meals = await screen.findAllByTestId(/^\d+-recipe-card$/i);
    expect(meals).toHaveLength(12);
  });

  it('Verfica se ao estar na tela de receitas com o pathname = "/meals", são renderizados apenas 5 categorias em formato de botões.', async () => {
    await act(async () => renderWithRouterAndProviders(<Recipes />, { initialEntries: ['/meals'] }));

    const mealCategories = await screen.findAllByTestId(/^.*-category-filter$/i);
    expect(mealCategories).toHaveLength(6);
  });

  it('Verfica se ao estar na tela de receitas com o pathname = "/drinks", são renderizados 12 cards de receitas de bebidas.', async () => {
    await act(async () => renderWithRouterAndProviders(<Recipes />, { initialEntries: ['/drinks'] }));

    const drinks = await screen.findAllByTestId(/^\d+-recipe-card$/i);
    expect(drinks).toHaveLength(12);
  });

  it('Verfica se ao estar na tela de receitas com o pathname = "/drinks", são renderizados apenas 5 categorias em formato de botões.', async () => {
    await act(async () => renderWithRouterAndProviders(<Recipes />, { initialEntries: ['/drinks'] }));

    const drinkCategories = await screen.findAllByTestId(/^.*-category-filter$/i);
    expect(drinkCategories).toHaveLength(6);
  });

  it('Verifica se ao clicar em uma categoria, da página de comidas, é aplicado um filtro por ela, e se ao clicar na mesma categoria novamente, o filtro é limpo.', async () => {
    await act(async () => renderWithRouterAndProviders(<Recipes />, { initialEntries: ['/meals'] }));

    const mealCategories = await screen.findAllByTestId(/^.*-category-filter$/i);
    const firstCategory = mealCategories[0];

    await act(async () => userEvent.click(firstCategory));

    const meals = await screen.findAllByTestId(/^\d+-recipe-card$/i);
    foodBeefCategoryResponse.meals.slice(0, 12).forEach((meal, index) => {
      expect(meals[index]).toHaveTextContent(meal.strMeal);
    });

    await act(async () => userEvent.click(firstCategory));

    const mealsAfterClick = await screen.findAllByTestId(/^\d+-recipe-card$/i);
    foodResponse.meals.slice(0, 12).forEach((meal, index) => {
      expect(mealsAfterClick[index]).toHaveTextContent(meal.strMeal);
    });
  });

  it('Verifica se ao clicar em uma categoria, da página de bebidas, é aplicado um filtro por ela, e se ao clicar na mesma categoria novamente, o filtro é limpo.', async () => {
    await act(async () => renderWithRouterAndProviders(<Recipes />, { initialEntries: ['/drinks'] }));

    const drinkCategories = await screen.findAllByTestId(/^.*-category-filter$/i);
    const firstCategory = drinkCategories[0];

    await act(async () => userEvent.click(firstCategory));

    const drinks = await screen.findAllByTestId(/^\d+-recipe-card$/i);
    drinkOrdinaryCategoryResponse.drinks.slice(0, 12).forEach((drink, index) => {
      expect(drinks[index]).toHaveTextContent(drink.strDrink);
    });

    await act(async () => userEvent.click(firstCategory));

    const drinksAfterClick = await screen.findAllByTestId(/^\d+-recipe-card$/i);
    drinksResponse.drinks.slice(0, 12).forEach((drink, index) => {
      expect(drinksAfterClick[index]).toHaveTextContent(drink.strDrink);
    });
  });

  it('Verifica se ao clicar no botão "All" os filtros são limpos.', async () => {
    await act(async () => renderWithRouterAndProviders(<Recipes />, { initialEntries: ['/meals'] }));

    const mealCategories = await screen.findAllByTestId(/^.*-category-filter$/i);
    const firstCategory = mealCategories[0];

    await act(async () => userEvent.click(firstCategory));

    const meals = await screen.findAllByTestId(/^\d+-recipe-card$/i);
    foodBeefCategoryResponse.meals.slice(0, 12).forEach((meal, index) => {
      expect(meals[index]).toHaveTextContent(meal.strMeal);
    });

    await act(async () => userEvent.click(mealCategories[5]));

    const mealsAfterClick = await screen.findAllByTestId(/^\d+-recipe-card$/i);
    foodResponse.meals.slice(0, 12).forEach((meal, index) => {
      expect(mealsAfterClick[index]).toHaveTextContent(meal.strMeal);
    });
  });
});
