import React, { useContext } from 'react';
import { useLocation, useHistory } from 'react-router-dom';

import Footer from '../components/Footer';
import FoodContext from '../context/FoodContext';
import DrinksContext from '../context/DrinksContext';
import RecipeCard from '../components/RecipeCard';
import Header from '../components/Header';

import '../styles/recipes.css';

export default function Recipes() {
  const location = useLocation();
  const history = useHistory();
  const pathname = location.pathname === '/meals' ? 'Meals' : 'Drinks';
  const isFood = pathname === 'Meals';
  const context = isFood ? FoodContext : DrinksContext;
  const {
    recipes,
    categories,
    setCategoryFilter,
    categoryFilter,
  } = useContext(context);
  const idField = isFood ? 'idMeal' : 'idDrink';

  if (recipes.length === 1 && !categoryFilter) {
    const [recipe] = recipes;
    const { [idField]: id } = recipe;
    history.push(`/${pathname.toLowerCase()}/${id}`);
    return;
  }

  const pageSize = 12;
  const categorySize = 5;

  return (
    <div className="test">

      <div className="recipesContainer">
        <Header
          title={ pathname }
          searchEnabled
        />
        <div className="categories-container">
          { categories.slice(0, categorySize).map((category) => (
            <button
              type="button"
              data-testid={ `${category.strCategory}-category-filter` }
              key={ category.strCategory }
              onClick={ () => {
                const cat = categoryFilter === category.strCategory
                  ? '' : category.strCategory;
                setCategoryFilter(cat);
              } }
            >
              { category.strCategory }
            </button>
          ))}
          <button
            type="button"
            data-testid="All-category-filter"
            onClick={ () => setCategoryFilter('') }
          >
            All
          </button>
        </div>
        <div className="card-container">
          { recipes.slice(0, pageSize).map((recipe, index) => (
            <RecipeCard
              title={ pathname ? 'Meals' : 'Drinks' }
              key={ recipe[idField] }
              recipe={ recipe }
              index={ index }
              id={ recipe[idField] }
              basePath={ isFood ? '/meals' : '/drinks' }
            />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
