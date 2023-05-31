import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';

import { renderWithRouter, renderWithRouterAndProviders } from './helpers/renderWith';
import Footer from '../components/Footer';
import Recipes from '../pages/Recipes';
import Profile from '../pages/Profile';
import Login from '../pages/Login';
import DoneRecipes from '../pages/DoneRecipes';
import FavoriteRecipes from '../pages/FavoriteRecipes';

describe('Testa componente Footer', () => {
  it('Verifica se o componente Footer e os icones existe na tela', () => {
    renderWithRouter(<Footer />);

    const footer = screen.getByTestId('footer');
    const drinkBtn = screen.getByTestId('drinks-bottom-btn');
    const mealsBtn = screen.getByTestId('meals-bottom-btn');

    expect(footer).toBeInTheDocument();
    expect(drinkBtn).toBeInTheDocument();
    expect(mealsBtn).toBeInTheDocument();
  });

  it('Verifica se o botão de drinks redireciona para página de drinks', async () => {
    const { history } = renderWithRouter(<Footer />);

    const drinkBtn = screen.getByTestId('drinks-bottom-btn');
    userEvent.click(drinkBtn);

    expect(history.location.pathname).toBe('/drinks');
  });

  it('Verifica se o botão de meals redireciona para página de meals', () => {
    const { history } = renderWithRouter(<Footer />);

    const mealsBtn = screen.getByTestId('meals-bottom-btn');
    userEvent.click(mealsBtn);

    expect(history.location.pathname).toBe('/meals');
  });

  it('Verifica se quando a pagina de receitas e carregada o componente Footer é renderizado', async () => {
    await act(async () => renderWithRouterAndProviders(<Recipes />, {
      initialEntries: ['/meals'],
    }));

    const footer = screen.getByTestId('footer');
    expect(footer).toBeInTheDocument();
  });

  it('Verifica se quando a pagina de perfil é carrega o componente Footer é renderizado', () => {
    renderWithRouter(<Profile />);

    const footer = screen.getByTestId('footer');
    expect(footer).toBeInTheDocument();
  });

  it('Verifica se quando página de login é renderizado o componente Footer não é renderizado', () => {
    renderWithRouter(<Login />);

    const footer = screen.queryByTestId('footer');
    expect(footer).not.toBeInTheDocument();
  });

  it('Verifica se quando página de receitas prontas é renderizado o componente Footer não é renderizado', () => {
    renderWithRouter(<DoneRecipes />);

    const footer = screen.queryByTestId('footer');
    expect(footer).not.toBeInTheDocument();
  });

  it('Verifica se quando página de favoritos é renderizado o componente Footer não é renderizado', () => {
    renderWithRouter(<FavoriteRecipes />);

    const footer = screen.queryByTestId('footer');
    expect(footer).not.toBeInTheDocument();
  });
});
