import React from 'react';
import { Link } from 'react-router-dom';

import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';

import '../styles/footer.css';

export default function Footer() {
  return (
    <footer data-testid="footer">
      <Link to="/drinks">
        <img
          src={ drinkIcon }
          alt="Ícone de drink, que, ao clicar, redireciona para a página de drinks."
          data-testid="drinks-bottom-btn"
        />

      </Link>
      <h4>
        oneClick Recipes
      </h4>
      <Link to="/meals">
        <img
          src={ mealIcon }
          alt="Ícone de comida, que, ao clicar, redireciona para a página de comidas."
          data-testid="meals-bottom-btn"
        />
      </Link>
    </footer>
  );
}
