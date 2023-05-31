import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { isValidEmail, isValidPassword, readObject } from '../helpers';
import { requestLogin } from '../helpers/fetch';
import '../styles/login.css';

export default function Login() {
  const [email, setEmail] = useState('');
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
    const data = await requestLogin('/users/login', { email, password });
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
    const isDisabled = !(isEmailValid && isPasswordValid);
    setDisabled(isDisabled);
  }, [email, password]);

  return (
    <div className="container">
      <h4 className="titleLogin">oneClick Recipes</h4>
      <div className="loginContainer">
        <h6>Login</h6>
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
        <span>{fetchError && fetchMessage}</span>
        <button
          type="button"
          data-testid="login-submit-btn"
          onClick={ doLogin }
          disabled={ disabled }
        >
          Login
        </button>
        <h6>
          Não tem cadastro?
          <Link to="register" className="remove-underline">{' Clique aqui!'}</Link>
        </h6>
      </div>
    </div>
  );
}
