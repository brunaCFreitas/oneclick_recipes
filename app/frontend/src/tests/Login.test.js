import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { renderWithRouter } from './helpers/renderWith';
import Login from '../pages/Login';

const emailTestId = 'email-input';
const passwordTestId = 'password-input';
const loginButtonTestId = 'login-submit-btn';

const emailTest = 'joao-antonio@trybe.com.br';
const invalidEmailTest = 'joao-antonio@trybe';
const passwordTest = '1234#ci';
const invalidPasswordTest = '123#ci';

describe('Tela de Login', () => {
  it('Verifica se existem os elementos de input com os devidos test-ids.', () => {
    renderWithRouter(<Login />);

    const emailInput = screen.getByTestId(emailTestId);
    const passwordInput = screen.getByTestId(passwordTestId);
    const loginButton = screen.getByTestId(loginButtonTestId);

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
  });

  it('Verifica se é possível o usuário escrever no input de email e senha.', async () => {
    renderWithRouter(<Login />);

    const emailInput = screen.getByTestId(emailTestId);
    const passwordInput = screen.getByTestId(passwordTestId);

    await act(() => {
      userEvent.type(emailInput, emailTest);
      userEvent.type(passwordInput, passwordTest);
    });

    expect(emailInput).toHaveValue(emailTest);
    expect(passwordInput).toHaveValue(passwordTest);
  });

  it('Verifica se o botão de login está desabilitado quando o email e/ou a senha não são válidos.', async () => {
    renderWithRouter(<Login />);

    const emailInput = screen.getByTestId(emailTestId);
    const passwordInput = screen.getByTestId(passwordTestId);
    const loginButton = screen.getByTestId(loginButtonTestId);

    await act(() => {
      userEvent.type(emailInput, emailTest);
      userEvent.type(passwordInput, invalidPasswordTest);
    });

    expect(loginButton).toBeDisabled();

    await act(() => {
      userEvent.type(emailInput, invalidEmailTest);
      userEvent.type(passwordInput, passwordTest);
    });

    expect(loginButton).toBeDisabled();

    await act(() => {
      userEvent.type(emailInput, invalidEmailTest);
      userEvent.type(passwordInput, invalidPasswordTest);
    });

    expect(loginButton).toBeDisabled();
  });

  it('Verifica se o botão de login está habilitado quando o email e a senha são válidos.', async () => {
    renderWithRouter(<Login />);

    const emailInput = screen.getByTestId(emailTestId);
    const passwordInput = screen.getByTestId(passwordTestId);
    const loginButton = screen.getByTestId(loginButtonTestId);

    await act(() => {
      userEvent.type(emailInput, emailTest);
      userEvent.type(passwordInput, passwordTest);
    });

    expect(loginButton).toBeEnabled();
  });

  it('Verifica se o botão de login redireciona para a tela de comidas.', async () => {
    const { history } = renderWithRouter(<Login />);

    const emailInput = screen.getByTestId(emailTestId);
    const passwordInput = screen.getByTestId(passwordTestId);
    const loginButton = screen.getByTestId(loginButtonTestId);

    await act(() => {
      userEvent.type(emailInput, emailTest);
      userEvent.type(passwordInput, passwordTest);
    });

    userEvent.click(loginButton);

    const { pathname } = history.location;

    expect(pathname).toBe('/meals');
  });
});
