import React from 'react';
import PropTypes from 'prop-types';

import mealIcon from '../images/mealIcon.svg';
import drinkIcon from '../images/drinkIcon.svg';

export default function FilterBtn(props) {
  const { filterType, clickToFilter } = props;
  let datatestId = '';
  if (filterType === 'Drinks') {
    datatestId = 'filter-by-drink-btn';
  } else if (filterType === 'Meals') {
    datatestId = 'filter-by-meal-btn';
  } else {
    datatestId = 'filter-by-all-btn';
  }

  return (
    <button
      type="button"
      data-testid={ datatestId }
      onClick={ () => clickToFilter(filterType) }
    >
      {
        filterType === 'All'
          ? <h3>All</h3>
          : (
            <img
              src={ filterType === 'Meals' ? mealIcon : drinkIcon }
              alt={ filterType === 'Meals'
                ? 'Icone de comida para filtras apenas as comidas'
                : 'Icone de comida para filtras apenas as comidas' }
            />
          )
      }
    </button>
  );
}

FilterBtn.propTypes = {
  filterType: PropTypes.string,
}.isRequired;
