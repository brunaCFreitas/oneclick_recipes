import React, { useCallback, useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { require } from 'clipboard-copy';
import Carousel from './Carousel';

import shareIcon from '../images/shareIcon.svg';
import whiteHeart from '../images/whiteHeartIcon.svg';
import blackHeart from '../images/blackHeartIcon.svg';
import '../styles/recipeDetails.css';
import { deleteData, postData, requestData } from '../helpers/fetch';

export default function DrinkDetails({ result }) {
  const [ingredients, setIngredients] = useState([]);
  const [copyLink, setCopyLink] = useState(false);
  const [favorite, setFavorite] = useState(false);

  const {
    idDrink,
    strDrinkThumb,
    strDrink,
    strAlcoholic,
    strInstructions,
    strCategory } = result;

  const newRecipe = {
    id: idDrink,
    type: 'drink',
    nationality: '',
    category: strCategory,
    alcoholicOrNot: strAlcoholic,
    name: strDrink,
    image: strDrinkThumb,
  };

  const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
  const inProgressDrinks = Object.keys(inProgressRecipes?.drinks || {});
  const idInProgress = inProgressDrinks.includes(idDrink);

  const getFavoriteRecipe = useCallback(async () => {
    const data = await requestData('/recipes/favorites?type=drink');
    setFavorite(data.some((recipe) => recipe.idRecipe === newRecipe.id));
  }, [newRecipe.id]);

  useEffect(() => {
    const maxIngredient = 20;
    const ingredientList = [];

    getFavoriteRecipe();

    if (result) {
      for (let i = 1; i <= maxIngredient; i += 1) {
        if (result[`strIngredient${i}`]) {
          ingredientList.push({
            ingredient: result[`strIngredient${i}`],
            measure: result[`strMeasure${i}`],
          });
        }
      }
    }

    setIngredients(ingredientList);
  }, [getFavoriteRecipe, newRecipe.id, result]);

  const copyToClipboard = (id) => {
    const copy = require('clipboard-copy');
    const url = `http://localhost:3000/drinks/${id}`;
    copy(url);
    setCopyLink(true);
  };

  const favoriteRecipe = () => {
    if (favorite === false) {
      const endPoint = `/recipes/favorites/${newRecipe.id}`;
      postData(endPoint, newRecipe)
        .then(() => setFavorite(true))
        .catch((e) => console(e));
      return;
    }

    deleteData(`/recipes/favorites/${newRecipe.id}?type=drink`)
      .then(() => setFavorite(false))
      .catch((e) => console(e));
  };

  if (ingredients.length === 0) { return <div>Loading...</div>; }
  return (
    <div className="recipeContainer">
      <h2
        data-testid="recipe-title"
        className="titleDetails"
      >
        {strDrink}
      </h2>
      <img
        className="imageDetails"
        data-testid="recipe-photo"
        src={ strDrinkThumb }
        alt={ strDrink }
      />
      <div className="buttonContainerDetails">
        <div className="buttonContainerDetailsButtons">
          <button
            type="button"
            onClick={ () => copyToClipboard(idDrink) }
          >
            <img
              data-testid="share-btn"
              src={ shareIcon }
              alt="share"
            />
          </button>

          <button
            type="button"
            onClick={ () => favoriteRecipe() }
          >
            <img
              data-testid="favorite-btn"
              src={ favorite ? blackHeart : whiteHeart }
              alt="share"
            />
          </button>
        </div>
        <div>{copyLink && <span>Link copied!</span>}</div>
      </div>

      <h3 data-testid="recipe-category">{strAlcoholic}</h3>

      <div className="ingredientsNinstructions">
        <ul>
          {ingredients.map(({ ingredient, measure }, index) => (
            <li
              data-testid={ `${index}-ingredient-name-and-measure` }
              key={ index }
            >
              {ingredient}
              {' '}
              -
              {' '}
              {measure}
            </li>
          ))}
        </ul>

        <p
          data-testid="instructions"
          className="instructionContainer"
        >
          {strInstructions}
        </p>
      </div>

      <div className="carousel">
        <Carousel
          pathname="drinks"
          show={ 2 }
        />
      </div>

      <Link to={ `/drinks/${idDrink}/in-progress` }>
        <button
          data-testid="start-recipe-btn"
          className="start-button"
          type="button"
        >
          {idInProgress ? 'Continue Recipe' : 'Start Recipe'}
        </button>
      </Link>
    </div>
  );
}

DrinkDetails.propTypes = {}.isRequired;
