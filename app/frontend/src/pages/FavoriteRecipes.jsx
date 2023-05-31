import clipboardCopy from 'clipboard-copy';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import '../styles/favoriteRecipes.css';
import { deleteData, requestData } from '../helpers/fetch';

export default function FavoriteRecipes() {
  const [recipes, setRecipes] = useState([]);
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [copy, setCopy] = useState(false);

  const getFavorites = async () => {
    const data = await requestData('/recipes/favorites');
    setRecipes(data);
    setDoneRecipes(data);
  };

  useEffect(() => {
    getFavorites();
  }, []);

  const handleClickFavorite = (id, type) => {
    deleteData(`/recipes/favorites/${id}?type=${type}`)
      .then(() => getFavorites());
  };

  const magicNum = 1000;

  const handleClickShare = (type, id) => {
    setCopy(true);
    setTimeout(() => setCopy(false), magicNum);
    clipboardCopy(`http://localhost:3000/${type}s/${id}`);
  };

  const handleClickAll = () => {
    getFavorites();
  };

  const handleClickMeal = () => {
    const newFavDrink = recipes.filter((recipe) => recipe.type === 'meal');
    setDoneRecipes(newFavDrink);
  };

  const handleClickDrink = async () => {
    const newFavDrink = recipes.filter((recipe) => recipe.type === 'drink');
    setDoneRecipes(newFavDrink);
  };

  return (
    <div>
      <Header title="Favorite Recipes" />

      <div className="filtersFavoriteRecipes">
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ handleClickAll }
        >
          All
        </button>

        <button
          type="button"
          data-testid="filter-by-meal-btn"
          onClick={ handleClickMeal }
        >
          Meals
        </button>

        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ handleClickDrink }
        >
          Drinks
        </button>
      </div>

      <div className="favoriteRecipesContainer">
        {
          doneRecipes
        && doneRecipes.map((reciepe, i) => (
          <div key={ i } className="cardContainerFav">
            <Link to={ `${reciepe.type}s/${reciepe.idRecipe}` }>
              <img
                className="cardImgFav"
                style={ { width: '150px' } }
                src={ reciepe.image }
                alt="imagem do prato"
                data-testid={ `${i}-horizontal-image` }
              />

              <h3
                data-testid={ `${i}-horizontal-name` }
              >
                {reciepe.name}
              </h3>
            </Link>

            {
              reciepe.type === 'drink' ? (
                <p
                  data-testid={ `${i}-horizontal-top-text` }
                >
                  {reciepe.alcoholicOrNot}
                </p>
              )
                : (
                  <p
                    data-testid={ `${i}-horizontal-top-text` }
                  >
                    {reciepe.nationality}
                    {' - '}
                    {reciepe.category}
                  </p>
                )
            }
            <div className="buttonContainerFav">
              <button
                type="button"
                onClick={ () => handleClickShare(reciepe.type, reciepe.id) }
              >
                <img
                  src={ shareIcon }
                  alt="compartilhar"
                  data-testid={ `${i}-horizontal-share-btn` }
                />
                {copy && <p>Link copied!</p>}
              </button>

              <button
                type="button"
                onClick={ () => handleClickFavorite(reciepe.idRecipe, reciepe.type) }
              >
                <img
                  src={ blackHeartIcon }
                  alt="favoritos"
                  data-testid={ `${i}-horizontal-favorite-btn` }
                />
              </button>
            </div>
          </div>
        ))
        }
      </div>
    </div>
  );
}
