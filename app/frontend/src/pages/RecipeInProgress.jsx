import React, { useCallback, useEffect, useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { require } from 'clipboard-copy';
import { fetchByType as fetchMealByID } from '../services/mealAPI';
import { fetchByType as fetchDrinkByID } from '../services/cockTailAPI';
import whiteHeart from '../images/whiteHeartIcon.svg';
import blackHeart from '../images/blackHeartIcon.svg';
import {
  callIngredients,
  handleFinishRecipeBtnHelper,
  newRecipe as newRecipeHelper,
} from '../helpers/helpers_recipe_in_progess';
import '../styles/recipesInProgress.css';
import {
  deleteData, finishInProgress, postData,
  requestData, updateInProgress } from '../helpers/fetch';
import { finishConstructor } from '../helpers';

export default function RecipeInProgress() {
  const history = useHistory();
  const { id } = useParams();
  const location = useLocation();
  const path = location.pathname;
  const typeOfUrl = path.split('/')[1];
  const [checked, setChecked] = useState({});
  const [meals, setMeals] = useState({});
  const [drinks, setDrinks] = useState({});
  const [isDisabled, setIsDisabled] = useState(true);
  const [copyLink, setCopyLink] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const magicNum = {
    one: -1,
    three: 3,
    thousand: 1000,
    twenty: 20,
  };
  const newRecipe = newRecipeHelper(meals, drinks, typeOfUrl, magicNum);
  const type = typeOfUrl === 'meals' ? 'meal' : 'drink';
  const isChecked = useCallback((ingredient) => checked[ingredient], [checked]);

  const getInProgress = useCallback(async () => {
    const data = await requestData(`recipes/${typeOfUrl}/in-progress/${id}`);
    setChecked(data);
  }, [id, typeOfUrl]);

  const getFavoriteRecipe = useCallback(async () => {
    const data = await requestData(`/recipes/favorites?type=${type}`);
    setFavorite(data.some((recipe) => recipe.idRecipe === newRecipe.id));
  }, [newRecipe.id, type]);

  useEffect(() => {
    let fetchByID;
    if (typeOfUrl === 'meals') {
      fetchByID = async () => {
        fetchMealByID('id', id).then((data) => setMeals(data[0]));
      };
    } else {
      fetchByID = async () => {
        fetchDrinkByID('id', id).then((data) => setDrinks(data[0]));
      };
    }
    fetchByID();
    getInProgress();
    getFavoriteRecipe();
  }, [getFavoriteRecipe, getInProgress, id, typeOfUrl]);

  const copyToClipboard = (idParam) => {
    const copy = require('clipboard-copy');
    const url = `http://localhost:3000/${typeOfUrl}/${idParam}`;
    copy(url);
    setCopyLink(true);
    setTimeout(() => setCopyLink(false), magicNum.thousand);
  };

  const handleChecked = useCallback(async (event) => {
    const body = {
      idField: event.target.name,
      value: event.target.checked,
    };
    const endPoint = `/recipes/${typeOfUrl}/in-progress/${id}`;
    await updateInProgress(endPoint, body);
    getInProgress();
  }, [getInProgress, id, typeOfUrl]);

  const contador = useCallback(() => {
    let count = 0;
    for (let i = 0; i < magicNum.twenty; i += 1) {
      if (checked[`strIngredient${i}`]) { count += 1; }
    }
    return count;
  }, [checked, magicNum.twenty]);

  const checkDisabledBtn = useCallback(() => {
    let ingredients = [];
    if (typeOfUrl === 'meals') {
      const callMeals = callIngredients(meals, undefined, isChecked, handleChecked);
      ingredients = [...callMeals];
    } else {
      const callDrinks = callIngredients(undefined, drinks, isChecked, handleChecked);
      ingredients = [...callDrinks];
    }
    try {
      if (contador() >= ingredients.length) {
        setIsDisabled(false);
      } else {
        setIsDisabled(true);
      }
    } catch (error) {
      setIsDisabled(true);
    }
  }, [typeOfUrl, meals, isChecked, handleChecked, drinks, contador]);

  const favoriteRecipe = async () => {
    if (favorite === false) {
      const endPoint = `/recipes/favorites/${newRecipe.id}`;
      postData(endPoint, newRecipe)
        .then(() => setFavorite(true))
        .catch((e) => console(e));
      return;
    }
    deleteData(`/recipes/favorites/${newRecipe.id}?type=${type}`)
      .then(() => setFavorite(false))
      .catch((e) => console(e));
  };
  useEffect(() => {
    checkDisabledBtn();
  }, [checkDisabledBtn]);

  const handleFinishRecipeBtn = async () => {
    const recipe = typeOfUrl === 'meals' ? meals : drinks;
    console.log('recipe', recipe);
    const body = finishConstructor(recipe);
    const endPoint = `recipes/in-progress/${id}/finish`;
    await finishInProgress(endPoint, body);
    handleFinishRecipeBtnHelper(meals, drinks, typeOfUrl);
    history.push('/done-recipes');
  };

  console.log(typeOfUrl, drinks);

  return (
    <div>
      {meals.strMeal && (
        <div className="RIPContainer">
          <h2
            data-testid="recipe-title"
            className="titleRIP"
          >
            {`Recipe in Progress: ${meals.strMeal}`}
          </h2>
          <img
            className="imageRIP"
            data-testid="recipe-photo"
            src={ meals.strMealThumb }
            alt={ meals.strMeal }
          />
          <div>
            <button
              type="button"
              data-testid="share-btn"
              onClick={ () => copyToClipboard(id) }
            >
              Share
            </button>
            <button
              type="button"
              onClick={ () => favoriteRecipe() }
            >
              <img
                data-testid="favorite-btn"
                src={ favorite ? blackHeart : whiteHeart }
                alt="share"
                width="26px"
              />
            </button>
            <button
              type="button"
              data-testid="finish-recipe-btn"
              disabled={ isDisabled }
              onClick={ handleFinishRecipeBtn }
            >
              Finish Recipe
            </button>
          </div>
          {copyLink && <span>Link copied!</span>}
          <h3 data-testid="recipe-category">{meals.strCategory}</h3>
          <div className="ingredientsNinstructionsRIP">
            <ul>{callIngredients(meals, undefined, isChecked, handleChecked)}</ul>
            <h5 data-testid="instructions">{meals.strInstructions}</h5>
          </div>
        </div>
      )}
      { drinks.idDrink && (
        <div className="RIPContainer">
          <h2
            data-testid="recipe-title"
            className="titleRIP"
          >
            {`Recipe in Progress: ${drinks.strDrink}`}

          </h2>
          <img
            className="imageRIP"
            data-testid="recipe-photo"
            src={ drinks.strDrinkThumb }
            alt={ drinks.strDrink }
          />
          <div>
            <button
              type="button"
              data-testid="share-btn"
              onClick={ () => copyToClipboard(id) }
            >
              Share
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
            <button
              type="button"
              data-testid="finish-recipe-btn"
              onClick={ handleFinishRecipeBtn }
              disabled={ isDisabled }
            >
              Finish Recipe
            </button>
          </div>
          {copyLink && <span>Link copied!</span>}
          <h3 data-testid="recipe-category">{drinks.strAlcoholic}</h3>
          <div className="ingredientsNinstructionsRIP">
            <ul>{callIngredients(undefined, drinks, isChecked, handleChecked)}</ul>
            <h5 data-testid="instructions">{drinks.strInstructions}</h5>
          </div>
        </div>
      )}
    </div>
  );
}
