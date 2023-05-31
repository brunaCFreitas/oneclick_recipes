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
  foodByIngredientChickenResponse,
  drinksByIngredientLemonResponse,
  drinkByNameGGResponse,
  foodByNameBeefResponse,
  drinkByFirstLetterAResponse,
  foodByFirstLetterBResponse,
} from './mocks';

const getAllFoodsPath = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const getAllDrinksPath = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
const getFoodCategoriesPath = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
const getDrinkCategoriesPath = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
const getFoodByCategoryPath = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=Beef';
const getDrinkByCategoryPath = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Ordinary Drink';
const getFoodByNameChickenPath = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken';
const getDrinkByIngredientLemonPath = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=lemon';
const getDrinkByNameGGPath = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=GG';
const getFoodByNameBeefPath = 'https://www.themealdb.com/api/json/v1/1/search.php?s=beef';
const getDrinkByFirstLetterAPath = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a';
const getFoodByFirstLetterBPath = 'https://www.themealdb.com/api/json/v1/1/search.php?f=b';

const responseByPath = {
  [getAllFoodsPath]: foodResponse,
  [getAllDrinksPath]: drinksResponse,
  [getFoodCategoriesPath]: foodCategoriesResponse,
  [getDrinkCategoriesPath]: drinksCategoriesResponse,
  [getFoodByCategoryPath]: foodBeefCategoryResponse,
  [getDrinkByCategoryPath]: drinkOrdinaryCategoryResponse,
  [getFoodByNameChickenPath]: foodByIngredientChickenResponse,
  [getDrinkByIngredientLemonPath]: drinksByIngredientLemonResponse,
  [getDrinkByNameGGPath]: drinkByNameGGResponse,
  [getFoodByNameBeefPath]: foodByNameBeefResponse,
  [getDrinkByFirstLetterAPath]: drinkByFirstLetterAResponse,
  [getFoodByFirstLetterBPath]: foodByFirstLetterBResponse,
};

const SEARCH_ICON_TEST_ID = 'search-top-btn';
const SEARCH_BUTTON_TEST_ID = 'exec-search-btn';
const SEARCH_INPUT_TEST_ID = 'search-input';
const SEARCH_RADIO_INGREDIENT_TEST_ID = 'ingredient-search-radio';
const SEARCH_RADIO_NAME_TEST_ID = 'name-search-radio';
const SEARCH_RADIO_FIRST_LETTER_TEST_ID = 'first-letter-search-radio';

describe('Componente SearchBar', () => {
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

  it('Verifica se o toggle do SearchBar oculta/exibe ao ser clicado.', async () => {
    await act(async () => renderWithRouterAndProviders(<Recipes />, { initialEntries: ['/meals'] }));

    const searchButton = screen.getByTestId(SEARCH_ICON_TEST_ID);
    await act(async () => userEvent.click(searchButton));

    const searchBar = screen.getByTestId(SEARCH_INPUT_TEST_ID);
    expect(searchBar).toBeInTheDocument();

    await act(async () => userEvent.click(searchButton));
    expect(searchBar).not.toBeInTheDocument();
  });

  it('Verifica se o filtro por ingrediente filtra comidas.', async () => {
    await act(async () => renderWithRouterAndProviders(<Recipes />, { initialEntries: ['/meals'] }));

    const searchIconBtn = screen.getByTestId(SEARCH_ICON_TEST_ID);
    await act(async () => userEvent.click(searchIconBtn));

    const ingredientRadio = screen.getByTestId(SEARCH_RADIO_INGREDIENT_TEST_ID);
    await act(async () => userEvent.click(ingredientRadio));

    const searchInput = screen.getByTestId(SEARCH_INPUT_TEST_ID);
    await act(async () => userEvent.type(searchInput, 'chicken'));

    const searchButton = screen.getByTestId(SEARCH_BUTTON_TEST_ID);
    await act(async () => userEvent.click(searchButton));

    expect(global.fetch).toHaveBeenCalledWith(getFoodByNameChickenPath);
  });

  it('Verifica se o filtro por ingrediente filtra drinks.', async () => {
    await act(async () => renderWithRouterAndProviders(<Recipes />, { initialEntries: ['/drinks'] }));

    const searchIconBtn = screen.getByTestId(SEARCH_ICON_TEST_ID);
    await act(async () => userEvent.click(searchIconBtn));

    const ingredientRadio = screen.getByTestId(SEARCH_RADIO_INGREDIENT_TEST_ID);
    await act(async () => userEvent.click(ingredientRadio));

    const searchInput = screen.getByTestId(SEARCH_INPUT_TEST_ID);
    await act(async () => userEvent.type(searchInput, 'lemon'));

    const searchButton = screen.getByTestId(SEARCH_BUTTON_TEST_ID);
    await act(async () => userEvent.click(searchButton));

    expect(global.fetch).toHaveBeenCalledWith(getDrinkByIngredientLemonPath);
  });

  it('Verifica se o filtro por nome filtra drinks.', async () => {
    await act(async () => renderWithRouterAndProviders(<Recipes />, { initialEntries: ['/drinks'] }));

    const searchIconBtn = screen.getByTestId(SEARCH_ICON_TEST_ID);
    await act(async () => userEvent.click(searchIconBtn));

    const nameRadio = screen.getByTestId(SEARCH_RADIO_NAME_TEST_ID);
    await act(async () => userEvent.click(nameRadio));

    const searchInput = screen.getByTestId(SEARCH_INPUT_TEST_ID);
    await act(async () => userEvent.type(searchInput, 'GG'));

    const searchButton = screen.getByTestId(SEARCH_BUTTON_TEST_ID);
    await act(async () => userEvent.click(searchButton));

    expect(global.fetch).toHaveBeenCalledWith(getDrinkByNameGGPath);
  });

  it('Verifica se o filtro por nome filtra comidas.', async () => {
    await act(async () => renderWithRouterAndProviders(<Recipes />, { initialEntries: ['/meals'] }));

    const searchIconBtn = screen.getByTestId(SEARCH_ICON_TEST_ID);
    await act(async () => userEvent.click(searchIconBtn));

    const nameRadio = screen.getByTestId(SEARCH_RADIO_NAME_TEST_ID);
    await act(async () => userEvent.click(nameRadio));

    const searchInput = screen.getByTestId(SEARCH_INPUT_TEST_ID);
    await act(async () => userEvent.type(searchInput, 'beef'));

    const searchButton = screen.getByTestId(SEARCH_BUTTON_TEST_ID);
    await act(async () => userEvent.click(searchButton));

    expect(global.fetch).toHaveBeenCalledWith(getFoodByNameBeefPath);
  });

  it('Verifica se o filtro por primeira letra filtra drinks.', async () => {
    await act(async () => renderWithRouterAndProviders(<Recipes />, { initialEntries: ['/drinks'] }));

    const searchIconBtn = screen.getByTestId(SEARCH_ICON_TEST_ID);
    await act(async () => userEvent.click(searchIconBtn));

    const firstLetterRadio = screen.getByTestId(SEARCH_RADIO_FIRST_LETTER_TEST_ID);
    await act(async () => userEvent.click(firstLetterRadio));

    const searchInput = screen.getByTestId(SEARCH_INPUT_TEST_ID);
    await act(async () => userEvent.type(searchInput, 'a'));

    const searchButton = screen.getByTestId(SEARCH_BUTTON_TEST_ID);
    await act(async () => userEvent.click(searchButton));

    expect(global.fetch).toHaveBeenCalledWith(getDrinkByFirstLetterAPath);
  });

  it('Verifica se o filtro por primeira letra filtra comidas.', async () => {
    await act(async () => renderWithRouterAndProviders(<Recipes />, { initialEntries: ['/meals'] }));

    const searchIconBtn = screen.getByTestId(SEARCH_ICON_TEST_ID);
    await act(async () => userEvent.click(searchIconBtn));

    const firstLetterRadio = screen.getByTestId(SEARCH_RADIO_FIRST_LETTER_TEST_ID);
    await act(async () => userEvent.click(firstLetterRadio));

    const searchInput = screen.getByTestId(SEARCH_INPUT_TEST_ID);
    await act(async () => userEvent.type(searchInput, 'b'));

    const searchButton = screen.getByTestId(SEARCH_BUTTON_TEST_ID);
    await act(async () => userEvent.click(searchButton));

    expect(global.fetch).toHaveBeenCalledWith(getFoodByFirstLetterBPath);
  });
});
