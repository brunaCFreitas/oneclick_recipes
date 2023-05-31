import React, { useCallback, useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { require } from 'clipboard-copy';
import Carousel from './Carousel';
// import useLocalStorage from '../hooks/useLocalStorage';

import shareIcon from '../images/shareIcon.svg';
import whiteHeart from '../images/whiteHeartIcon.svg';
import blackHeart from '../images/blackHeartIcon.svg';
import '../styles/recipeDetails.css';
import { deleteData, postData, requestData } from '../helpers/fetch';

export default function MealDetails({ result }) {
  const [ingredients, setIngredients] = useState([]);
  const [copyLink, setCopyLink] = useState(false);
  const [favorite, setFavorite] = useState(false);

  const {
    idMeal,
    strMealThumb,
    strMeal,
    strArea,
    strCategory,
    strInstructions,
    strYoutube,
  } = result;

  const newRecipe = {
    id: idMeal,
    type: 'meal',
    nationality: strArea,
    category: strCategory,
    alcoholicOrNot: '',
    name: strMeal,
    image: strMealThumb,
  };

  // const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
  // const idDone = doneRecipes?.some(({ id }) => id === idMeal);

  const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
  const inProgressMeals = Object.keys(inProgressRecipes?.meals || {});
  const idInProgress = inProgressMeals.includes(idMeal);

  const getFavoriteRecipe = useCallback(async () => {
    const data = await requestData('/recipes/favorites?type=meal');
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

  const magicNum = 1000;

  const copyToClipboard = (id) => {
    const copy = require('clipboard-copy');
    const url = `http://localhost:3000/meals/${id}`;
    copy(url);
    setCopyLink(true);
    setTimeout(() => setCopyLink(false), magicNum);
  };

  const favoriteRecipe = async () => {
    if (favorite === false) {
      const endPoint = `/recipes/favorites/${newRecipe.id}`;
      postData(endPoint, newRecipe)
        .then(() => setFavorite(true))
        .catch((e) => console(e));
      return;
    }
    deleteData(`/recipes/favorites/${newRecipe.id}?type=meal`)
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
        {strMeal}
      </h2>
      <img
        data-testid="recipe-photo"
        className="imageDetails"
        src={ strMealThumb }
        alt={ strMeal }
      />

      <div className="buttonContainerDetails">
        <div className="buttonContainerDetailsButtons">
          <button
            type="button"
            onClick={ () => copyToClipboard(idMeal) }
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
        {copyLink && <span>Link copied!</span>}
      </div>
      <h3 data-testid="recipe-category">{strCategory}</h3>
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

      {strYoutube && (
        <iframe
          data-testid="video"
          width="560"
          height="315"
          src={ strYoutube.replace('watch?v=', 'embed/') }
          title={ strMeal }
          allowFullScreen
        />
      )}

      <div className="carousel">
        <Carousel
          pathname="meals"
          show={ 2 }
        />
      </div>

      <Link to={ `/meals/${idMeal}/in-progress` }>
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

MealDetails.propTypes = {}.isRequired;
