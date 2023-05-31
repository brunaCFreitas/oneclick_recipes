import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';

import FavoriteRecipes from '../pages/FavoriteRecipes';
import { renderWithRouterAndProviders } from './helpers/renderWith';

const setLocalStorage = (key, data) => {
  window.localStorage.setItem(key, JSON.stringify(data));
};

const favoriteRecipes = 'favoriteRecipes';

const recipes = [{
  id: '53013',
  type: 'meal',
  nationality: 'American',
  name: 'Big Mac',
  category: 'Beef',
  alcoholicOrNot: '',
  image: 'https://www.themealdb.com/images/media/meals/urzj1d1587670726.jpg',
}, {
  alcoholicOrNot: 'Alcoholic',
  category: 'Ordinary Drink',
  id: '17203',
  image: 'https://www.thecocktaildb.com/images/media/drink/apneom1504370294.jpg',
  name: 'Kir',
  nationality: '',
  type: 'drink',
}];

const recipes1 = [{
  alcoholicOrNot: 'Alcoholic',
  category: 'Ordinary Drink',
  id: '17203',
  image: 'https://www.thecocktaildb.com/images/media/drink/apneom1504370294.jpg',
  name: 'Kir',
  nationality: '',
  type: 'drink',
}];

const pathname = ['/favorite-recipes'];

describe('Verifica a Tela de Receitas Favoritos:', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('Testa os elementos da tela.', async () => {
    await act(async () => renderWithRouterAndProviders(
      <FavoriteRecipes />,
      { initialEntries: pathname },
    ));

    setLocalStorage(favoriteRecipes, recipes);
    expect(localStorage.getItem(favoriteRecipes)).toEqual(JSON.stringify(recipes));

    const allBtnFilter = screen.getByTestId('filter-by-all-btn');
    const mealsBtnFilter = screen.getByTestId('filter-by-meal-btn');
    const drinksBtnFilter = screen.getByTestId('filter-by-drink-btn');

    const pageTitle = screen.getByTestId('page-title');

    expect(allBtnFilter).toBeInTheDocument();
    expect(mealsBtnFilter).toBeInTheDocument();
    expect(drinksBtnFilter).toBeInTheDocument();
    expect(pageTitle).toBeInTheDocument();
  });

  // it('Testa se as receitas favoritas são renderizadas', async () => {
  //   await act(async () => renderWithRouterAndProviders(
  //     <FavoriteRecipes />,
  //     { initialEntries: pathname },
  //   ));

  //   setLocalStorage(favoriteRecipes, recipes);

  //   const bigMac = await screen.findByText(/big mac/i);
  //   const kir = await screen.findByText(/kir/i);

  //   expect(bigMac).toBeInTheDocument();
  //   expect(kir).toBeInTheDocument();
  //   expect(bigMac).toBeInTheDocument();
  // });

  it('Testa se o botão de filtar por comidas', async () => {
    await act(async () => renderWithRouterAndProviders(
      <FavoriteRecipes />,
      { initialEntries: pathname },
    ));

    setLocalStorage(favoriteRecipes, recipes);
    const mealsBtnFilter = screen.getByTestId('filter-by-meal-btn');

    userEvent.click(mealsBtnFilter);

    const bigMac = screen.getByText(/big mac/i);

    expect(bigMac).toBeInTheDocument();
  });

  it('Testa se o botão de filtar por bebidas', async () => {
    await act(async () => renderWithRouterAndProviders(
      <FavoriteRecipes />,
      { initialEntries: pathname },
    ));

    setLocalStorage(favoriteRecipes, recipes);
    const drinksBtnFilter = screen.getByTestId('filter-by-drink-btn');

    userEvent.click(drinksBtnFilter);

    const kir = screen.getByText(/kir/i);

    expect(kir).toBeInTheDocument();
  });

  it('Testa se o botão de filtar todas as categorias', async () => {
    await act(async () => renderWithRouterAndProviders(
      <FavoriteRecipes />,
      { initialEntries: pathname },
    ));

    setLocalStorage(favoriteRecipes, recipes);
    const allBtnFilter = screen.getByTestId('filter-by-all-btn');

    userEvent.click(allBtnFilter);

    const bigMac = screen.getByText(/big mac/i);
    const kir = screen.getByText(/kir/i);

    expect(kir).toBeInTheDocument();
    expect(bigMac).toBeInTheDocument();
  });

  // it('Testa se o botão de desfavoritar', async () => {
  //   await act(async () => renderWithRouterAndProviders(
  //     <FavoriteRecipes />,
  //     { initialEntries: pathname },
  //   ));

  //   setLocalStorage(favoriteRecipes, recipes);

  //   const unFavBtnBigMac = screen.getByTestId('0-horizontal-favorite-btn');

  //   userEvent.click(unFavBtnBigMac);

  //   setLocalStorage(favoriteRecipes, recipes1);
  //   expect(localStorage.getItem(favoriteRecipes)).toEqual(JSON.stringify(recipes1));

  //   const kir = screen.getByText(/kir/i);

  //   expect(kir).toBeInTheDocument();
  // });

  // it('Testa se o botão de desfavoritar todos', async () => {
  //   await act(async () => renderWithRouterAndProviders(
  //     <FavoriteRecipes />,
  //     { initialEntries: pathname },
  //   ));

  //   setLocalStorage(favoriteRecipes, recipes1);
  //   const unFavBtnBigMac = screen.getByTestId('0-horizontal-favorite-btn');

  //   userEvent.click(unFavBtnBigMac);

  //   setLocalStorage(favoriteRecipes, []);
  //   expect(localStorage.getItem(favoriteRecipes)).toEqual(JSON.stringify([]));
  // });

  // it('Testa se o botão de clipboard funciona', async () => {
  //   await act(async () => renderWithRouterAndProviders(
  //     <FavoriteRecipes />,
  //     { initialEntries: pathname },
  //   ));

  //   setLocalStorage(favoriteRecipes, recipes);
  //   const shareBtnBigMac = screen.getByTestId('0-horizontal-share-btn');

  //   userEvent.click(shareBtnBigMac);

  //   const copiedLinkShare = await screen.findByText(/link copied!/i);

  //   expect(copiedLinkShare).toBeInTheDocument();
  // });

  it('Teste funcao de desfavoritar', async () => {
    await act(async () => renderWithRouterAndProviders(
      <FavoriteRecipes />,
      { initialEntries: pathname },
    ));

    setLocalStorage(favoriteRecipes, recipes);

    const unFavBtn = await screen.findByTestId('0-horizontal-favorite-btn');

    userEvent.click(unFavBtn);

    expect(localStorage.getItem(favoriteRecipes)).toEqual(JSON.stringify(recipes1));
  });
});
