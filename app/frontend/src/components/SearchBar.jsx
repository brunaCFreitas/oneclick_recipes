import { useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';

import DrinksContext from '../context/DrinksContext';
import FoodContext from '../context/FoodContext';

import '../styles/searchbar.css';

export default function SearchBar() {
  const location = useLocation();
  const isFood = location.pathname === '/meals';
  const context = isFood ? FoodContext : DrinksContext;

  const {
    searchInput,
    searchType,
    setSearchInput,
    setSearchType,
  } = useContext(context);

  const [text, setText] = useState(searchInput);
  const [radio, setRadio] = useState(searchType);

  return (
    <div className="searchbarContainer">
      <input
        placeholder="Search..."
        className="searchInput"
        data-testid="search-input"
        type="text"
        onChange={ ({ target: { value } }) => setText(value) }
        value={ text }
      />
      <div className="radiosContainer">
        <label htmlFor="ingredient">
          {' '}
          <input
            type="radio"
            data-testid="ingredient-search-radio"
            id="ingredient"
            name="radio"
            defaultChecked={ radio === 'ingredient' }
            onClick={ () => setRadio('ingredient') }
          />
          Ingredient
        </label>

        <label htmlFor="name">
          {' '}
          <input
            type="radio"
            data-testid="name-search-radio"
            id="name"
            name="radio"
            defaultChecked={ radio === 'name' }
            onClick={ () => setRadio('name') }
          />
          Name
        </label>

        <label htmlFor="first-letter">
          {' '}
          <input
            type="radio"
            data-testid="first-letter-search-radio"
            id="first-letter"
            name="radio"
            defaultChecked={ radio === 'first-letter' }
            onClick={ () => setRadio('first-letter') }
          />
          First Letter
        </label>

        <button
          className="searchButton"
          type="button"
          data-testid="exec-search-btn"
          onClick={ () => {
            setSearchType(radio);
            setSearchInput(text);
          } }
        >
          Pesquisar
        </button>
      </div>
    </div>
  );
}
