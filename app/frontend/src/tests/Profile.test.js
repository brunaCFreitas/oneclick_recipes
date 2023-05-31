import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';

import Profile from '../pages/Profile';
import { renderWithRouterAndProviders } from './helpers/renderWith';

const setLocalStorage = (key, data) => {
  window.localStorage.setItem(key, JSON.stringify(data));
};

describe('Verifica a Tela de Profile:', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('Testa os elementos da tela.', async () => {
    await act(async () => renderWithRouterAndProviders(<Profile />, { initialEntries: ['/profile'] }));

    const userEmail = 'email';
    const userData = 'teste@gmail.com';

    setLocalStorage(userEmail, userData);
    expect(localStorage.getItem(userEmail)).toEqual(JSON.stringify(userData));

    const doneRecipes = screen.getByRole('button', { name: /done recipes/i });
    const favoriteRecipes = screen.getByRole('button', { name: /favorite recipes/i });
    const logout = screen.getByRole('button', { name: /logout/i });

    expect(doneRecipes).toBeInTheDocument();
    expect(favoriteRecipes).toBeInTheDocument();
    expect(logout).toBeInTheDocument();
  });

  it('Testa o botão Logout.', async () => {
    await act(async () => renderWithRouterAndProviders(<Profile />, { initialEntries: ['/profile'] }));

    const userEmail = 'email';
    const userData = 'teste@gmail.com';
    setLocalStorage(userEmail, userData);

    const logout = screen.getByRole('button', { name: /logout/i });
    await act(async () => userEvent.click(logout));
    window.localStorage.clear();

    expect(Object.entries(window.localStorage)).toHaveLength(0);
  });
});
