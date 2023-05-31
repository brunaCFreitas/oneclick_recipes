import PropTypes from 'prop-types';
import { useEffect, useMemo, useState } from 'react';
import FoodContext from './FoodContext';
import {
  fetchMeals,
  fetchMealsCategories,
  fetchMealsByCategory,
  fetchByType,
} from '../services/mealAPI';

function FoodProvider({ children }) {
  const [recipes, setRecipes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [searchType, setSearchType] = useState('ingredient');

  useEffect(() => {
    const fetchDefault = async () => {
      const response = await fetchMeals();
      setRecipes(response);
    };

    const fetchList = async () => {
      if (categoryFilter !== '') {
        const response = await fetchMealsByCategory(categoryFilter);
        setRecipes(response);
        return;
      }
      if (searchInput !== '') {
        const response = await fetchByType(searchType, searchInput);
        setRecipes(response);
        return;
      }
      await fetchDefault();
    };

    const fetch = async () => {
      const responseCategories = await fetchMealsCategories();
      setCategories(responseCategories);

      await fetchList();
    };
    fetch();
  }, [categoryFilter, searchInput, searchType]);

  const contextValue = useMemo(() => ({
    recipes,
    categories,
    categoryFilter,
    searchInput,
    searchType,
    setCategoryFilter,
    setSearchInput,
    setSearchType,
  }), [recipes, categories, categoryFilter, searchInput, searchType]);

  return (
    <FoodContext.Provider value={ contextValue }>
      { children }
    </FoodContext.Provider>
  );
}

FoodProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default FoodProvider;
