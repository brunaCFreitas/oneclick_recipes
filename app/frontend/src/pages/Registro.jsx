import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { useHistory } from 'react-router-dom';
import { isValidEmail, isValidPassword, isValidUsername, readObject } from '../helpers';
import { requestLogin } from '../helpers/fetch';
import '../styles/login.css';

export default function Registro() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [fetchError, setfetchError] = useState(false);
  const [fetchMessage, setFetchMessage] = useState('test');

  const history = useHistory();

  useEffect(() => {
    if (readObject('token', null)) {
      history.push('/meals');
    }
  }, [history]);

  const doLogin = async () => {
    const data = await requestLogin('/users/register', {
      email,
      password,
      username,
    });
    if (data.message) {
      setfetchError(true);
      setFetchMessage(data.message);
    } else {
      history.push('/meals');
    }
  };

  useEffect(() => {
    const isEmailValid = isValidEmail(email);
    const isPasswordValid = isValidPassword(password);
    const isUsernameValid = isValidUsername(username);
    const isDisabled = !(isEmailValid && isPasswordValid && isUsernameValid);
    setDisabled(isDisabled);
  }, [email, password, username]);

  return (
    <div className="container">
      <h1>{fetchError && fetchMessage}</h1>
      <h4 className="titleLogin">oneClick Recipes</h4>
      <div className="loginContainer">
        <h6>Cadastro</h6>
        <label htmlFor="username">
          <input
            placeholder="Nome"
            type="text"
            id="username"
            onChange={ ({ target: { value } }) => setUsername(value) }
            value={ username }
          />
        </label>
        <label htmlFor="email">
          <input
            placeholder="E-mail"
            type="email"
            id="email"
            data-testid="email-input"
            onChange={ ({ target: { value } }) => setEmail(value) }
            value={ email }
          />
        </label>
        <label htmlFor="password">
          <input
            placeholder="Password"
            type="password"
            id="password"
            data-testid="password-input"
            onChange={ ({ target: { value } }) => setPassword(value) }
            value={ password }
          />
        </label>
        <button
          type="button"
          data-testid="login-submit-btn"
          onClick={ doLogin }
          disabled={ disabled }
        >
          Registrar
        </button>
        <h6>
          Já é cadastrado?
          <Link to="login" className="remove-underline">{' Clique aqui!'}</Link>
        </h6>
      </div>
    </div>
  );
}
