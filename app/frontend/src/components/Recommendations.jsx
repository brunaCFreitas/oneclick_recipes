import React from 'react';
import PropTypes from 'prop-types';

export default function Recommendations({ recipes, currentIndex }) {
  const hideAfter = currentIndex + 1;
  const maxItems = 6;

  return (
    <>
      {recipes.slice(0, maxItems).map((recipe, index) => (
        <div
          key={ recipe.strMeal || recipe.strDrink }
          className="image-container"
        >
          <img
            data-testid={ `${index}-recommendation-card` }
            className={ `image-size ${hideAfter < index ? 'hidden' : ''}` }
            src={ recipe.strMealThumb || recipe.strDrinkThumb }
            alt={ recipe.strMeal || recipe.strDrink }
          />
          <span
            data-testid={ `${index}-recommendation-title` }
            className={ `text-container ${hideAfter < index ? 'hidden' : ''}` }
          >
            {recipe.strMeal || recipe.strDrink }
          </span>
        </div>
      ))}
    </>
  );
}

Recommendations.propTypes = {
  recipes: PropTypes.array,
}.isRequired;
