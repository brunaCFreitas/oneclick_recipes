import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';

import Recipes from '../pages/Recipes';
import Profile from '../pages/Profile';
import { renderWithRouterAndProviders } from './helpers/renderWith';
import { emptyDrinkResponse, emptyFoodResponse } from './mocks';

describe('Verifica o componente Header:', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch')
      .mockImplementation((param) => ({
        json: async () => {
          if (param.match(/thecocktail/i)) {
            return emptyDrinkResponse;
          }

          return emptyFoodResponse;
        },
      }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Testa os elementos da tela.', async () => {
    await act(async () => renderWithRouterAndProviders(<Recipes />, { initialEntries: ['/meals'] }));

    const title = screen.getByText(/meals/i);
    const search = screen.getByRole('img', { name: /search/i });
    const profile = screen.getByRole('img', { name: /profile/i });

    expect(title).toBeInTheDocument();
    expect(search).toBeInTheDocument();
    expect(profile).toBeInTheDocument();
  });

  it('Testa o click no botão search.', async () => {
    await act(async () => renderWithRouterAndProviders(<Recipes />, { initialEntries: ['/drinks'] }));

    const search = screen.getByRole('img', { name: /search/i });
    await act(async () => userEvent.click(search));

    const searchBar = screen.getByRole('textbox');
    expect(searchBar).toBeInTheDocument();

    await act(async () => userEvent.click(search));

    const hiddenElement = screen.queryByRole('textbox');
    expect(hiddenElement).not.toBeInTheDocument();
  });

  it('Testa páginas sem o botão search.', async () => {
    await act(async () => renderWithRouterAndProviders(<Profile />, { initialEntries: ['/profile'] }));

    const search = screen.queryByRole('img', { name: /search/i });
    expect(search).not.toBeInTheDocument();
  });
});
