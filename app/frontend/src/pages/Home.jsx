import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { readObject } from '../helpers';
import '../styles/home.css';

export default function Home() {
  const history = useHistory();

  useEffect(() => {
    if (readObject('token', null)) {
      history.push('/meals');
    }
  }, [history]);

  return (
    <div className="container">
      <div className="container-style">
        <h1>Bem vindo ao oneClick recipes!!</h1>

        <div className="button-container">
          <button
            className="home-button"
            type="button"
            onClick={ () => history.push('/login') }
          >
            Login
          </button>

          <button
            className="home-button"
            type="button"
            onClick={ () => history.push('/register') }
          >
            Cadastre-se
          </button>
        </div>
      </div>
    </div>
  );
}
