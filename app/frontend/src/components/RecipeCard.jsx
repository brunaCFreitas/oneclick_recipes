import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { require } from 'clipboard-copy';
import { Link } from 'react-router-dom';

import shareIcon from '../images/shareIcon.svg';

import '../styles/recipeCard.css';

export default function RecipeCard({
  recipeId, title, index, image, name, category,
  doneDate, tags, nationality, type, alcoholicOrNot,
  recipe, id, basePath }) {
  const [copyLink, setCopyLink] = useState(false);

  const copyToClipboard = (idParm) => {
    const copy = require('clipboard-copy');
    const url = `http://localhost:3000/${type}s/${idParm}`;
    copy(url);
    setCopyLink(true);
  };

  return (
    <section className="cardContainer">
      {
        title === 'Done Recipes' && (
          <div title="card" name="card">
            { type === 'meal' && (
              <div data-testid="card" name="AllMeal" className="divCard">
                <div name="image">
                  <Link to={ `/${type}s/${recipeId}` }>
                    <img
                      src={ image }
                      alt="Foto da receita"
                      data-testid={ `${index}-horizontal-image` }
                      className="cardImg"
                    />
                  </Link>
                </div>
                <div name="meals-data">
                  <div>
                    <Link to={ `/${type}s/${recipeId}` }>
                      <h4
                        data-testid={ `${index}-horizontal-name` }
                      >
                        { name }
                      </h4>
                    </Link>
                    <h6
                      data-testid={ `${index}-horizontal-top-text` }
                    >
                      <span>{ nationality }</span>
                      {' - '}
                      <span
                        data-testid={ `${index}-horizontal-top-text` }
                      >
                        { category }
                      </span>
                    </h6>
                  </div>
                  <p>
                    <span>Done in: </span>
                    <span data-testid={ `${index}-horizontal-done-date` }>
                      { doneDate }
                    </span>
                  </p>
                  <div>
                    {
                      tags.split(',')
                        .map((tag) => (
                          <button
                            type="button"
                            key={ tag }
                            data-testid={ `${index}-${tag}-horizontal-tag` }
                          >
                            { tag }
                          </button>
                        ))
                    }
                  </div>
                </div>
                <div name="share">
                  <button
                    type="button"
                    onClick={ () => copyToClipboard(recipeId) }
                  >
                    <img
                      src={ shareIcon }
                      alt="Ícone para compartilhar receita."
                      data-testid={ `${index}-horizontal-share-btn` }
                      width="20"
                      height="20"
                    />
                  </button>
                  { copyLink && (
                    <span> Link copied!</span>
                  ) }
                </div>
              </div>
            ) }
            { type === 'drink' && (
              <div data-testid="card" name="allDrink" className="divCard">
                <div name="image">
                  <Link to={ `/${type}s/${recipeId}` }>
                    <img
                      src={ image }
                      alt="Foto da receita"
                      data-testid={ `${index}-horizontal-image` }
                      className="cardImg"
                    />
                  </Link>
                </div>
                <div name="drink-data">
                  <div>
                    <Link to={ `/${type}s/${recipeId}` }>
                      <h4
                        data-testid={ `${index}-horizontal-name` }
                      >
                        { name }
                      </h4>
                    </Link>
                    <h6
                      data-testid={ `${index}-horizontal-top-text` }
                    >
                      <span>{ alcoholicOrNot }</span>
                    </h6>
                  </div>
                  <p>
                    <span>Done in: </span>
                    <span data-testid={ `${index}-horizontal-done-date` }>
                      { doneDate }
                    </span>
                  </p>
                  <div>
                    {
                      tags.split(',')
                        .map((tag) => (
                          <button
                            type="button"
                            key={ tag }
                            data-testid={ `${index}-${tag}-horizontal-tag` }
                          >
                            { tag }
                          </button>
                        ))
                    }
                  </div>
                </div>
                <div name="share">
                  <button
                    type="button"
                    onClick={ () => copyToClipboard(recipeId) }
                  >
                    <img
                      src={ shareIcon }
                      alt="Ícone para compartilhar receita."
                      data-testid={ `${index}-horizontal-share-btn` }
                      width="20"
                      height="20"
                    />
                  </button>
                  { copyLink && (
                    <span>Link copied!</span>
                  ) }
                </div>
              </div>
            ) }
          </div>
        )
      }
      { title === ('Meals' || 'Drinks') && (

        <Link
          to={ `${basePath}/${id}` }
        >
          <div className="cardElement" data-testid={ `${index}-recipe-card` }>
            <img
              data-testid={ `${index}-card-img` }
              src={ recipe.strMealThumb || recipe.strDrinkThumb }
              alt="recipe"
              className="cardImg"
            />
            <h3 data-testid={ `${index}-card-name` }>
              {recipe.strMeal
                  || recipe.strDrink}
            </h3>
          </div>
        </Link>
      )}
    </section>
  );
}

RecipeCard.propTypes = {
  title: PropTypes.string,
  recipe: PropTypes.shape({
    strMeal: PropTypes.string,
    strDrink: PropTypes.string,
    strMealThumb: PropTypes.string,
    strDrinkThumb: PropTypes.string,
  }),
  index: PropTypes.number,
  id: PropTypes.string,
  basePath: PropTypes.string,
  recipeId: PropTypes.string,
  image: PropTypes.string,
  name: PropTypes.string,
  category: PropTypes.string,
  doneDate: PropTypes.string,
  nationality: PropTypes.string,
  type: PropTypes.string,
  alcoholicOrNot: PropTypes.string,
  tags: PropTypes.array,
}.isRequired;
