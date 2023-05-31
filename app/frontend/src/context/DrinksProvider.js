import PropTypes from 'prop-types';
import { useEffect, useMemo, useState } from 'react';
import DrinksContext from './DrinksContext';
import {
  fetchDrinks,
  fetchDrinksCategories,
  fetchDrinksByCategory,
  fetchByType,
} from '../services/cockTailAPI';

function DrinksProvider({ children }) {
  const [recipes, setRecipes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [searchType, setSearchType] = useState('ingredient');

  useEffect(() => {
    const fetchDefault = async () => {
      const response = await fetchDrinks();
      setRecipes(response);
    };

    const fetchList = async () => {
      if (categoryFilter !== '') {
        const response = await fetchDrinksByCategory(categoryFilter);
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
      const responseCategories = await fetchDrinksCategories();
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
    <DrinksContext.Provider value={ contextValue }>
      { children }
    </DrinksContext.Provider>
  );
}

DrinksProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DrinksProvider;
