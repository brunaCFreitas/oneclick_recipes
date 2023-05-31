import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import RecipeInProgress from '../pages/RecipeInProgress';
import { renderWithRouterAndProviders } from './helpers/renderWith';
import { foodByIDResponse, drinksyIDResponse } from './mocks';

// const setLocalStorage = (key, data) => {
//   window.localStorage.setItem(key, JSON.stringify(data));
// };

describe('Verifica a tela Recepies In Progress Meals:', () => {
  beforeEach(async () => {
    jest.spyOn(global, 'fetch').mockImplementation(() => ({
      json: async () => {
        const response = foodByIDResponse;
        if (!response) {
          throw new Error('Mock not found for URL');
        }
        return response;
      },
    }));
    await act(async () => renderWithRouterAndProviders(<RecipeInProgress />, {
      initialEntries: ['/meals/52771/in-progress'],
    }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Testa os elementos da tela meals.', async () => {
    const recepiesHeading = screen.getByRole('heading', { name: /recepies/i });
    expect(recepiesHeading).toBeInTheDocument();

    const share = screen.getByRole('button', { name: /share/i });
    const favorite = screen.getByRole('button', { name: /favorite/i });
    const finish = screen.getByRole('button', { name: /finish recipe/i });
    expect(share).toBeInTheDocument();
    expect(favorite).toBeInTheDocument();
    expect(finish).toBeInTheDocument();
  });

  it('Testa se o botão Finish Recipe esta desabilitado', async () => {
    const checkboxes = screen.getAllByRole('checkbox');
    const finish = screen.getByRole('button', { name: /finish recipe/i });

    act(() => {
      checkboxes.forEach((checkbox) => userEvent.click(checkbox));
    });

    expect(finish).toBeEnabled();
  });
});

describe('Verifica a tela Recepies In Progress Drinks:', () => {
  beforeEach(async () => {
    jest.spyOn(global, 'fetch').mockImplementation(() => ({
      json: async () => {
        const response = drinksyIDResponse;
        if (!response) {
          throw new Error('Mock not found for URL');
        }
        return response;
      },
    }));
    await act(async () => renderWithRouterAndProviders(<RecipeInProgress />, {
      initialEntries: ['drinks/15997/in-progress'],
    }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Testa os elementos da tela meals.', async () => {
    const recepiesHeading = screen.getByRole('heading', { name: /recepies/i });
    expect(recepiesHeading).toBeInTheDocument();

    const share = screen.getByRole('button', { name: /share/i });
    const favorite = screen.getByRole('button', { name: /favorite/i });
    const finish = screen.getByRole('button', { name: /finish recipe/i });
    expect(share).toBeInTheDocument();
    expect(favorite).toBeInTheDocument();
    expect(finish).toBeInTheDocument();
  });

  // it('Testa se o botão Finish Recipe esta desabilitado', async () => {
  //   const checkboxes = screen.getAllByRole('checkbox');
  //   const finish = screen.getByRole('button', { name: /finish recipe/i });

  //   act(() => {
  //     checkboxes.forEach((checkbox) => userEvent.click(checkbox));
  //   });

  //   expect(finish).toBeEnabled();
  // });
});
