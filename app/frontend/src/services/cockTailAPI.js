import { requestData } from '../helpers/fetch';

const messages = {
  notFound: 'Sorry, we haven\'t found any recipes for these filters.',
  invalidSearchInput: 'Your search must have only 1 (one) character',
};

export const fetchByIngredient = async (searchInput) => {
  let response;
  if (searchInput) {
    const { meals } = await requestData(`drinks/ingredient?q=${searchInput}`);
    response = meals;
  } else {
    const { meals } = await requestData('drinks/ingredients');
    response = meals;
  }

  if (!response || response.length === 0) {
    global.alert(messages.notFound);
  }
  return response || [];
};

export const fetchByName = async (searchInput) => {
  let response;
  if (searchInput) {
    const { meals } = await requestData(`drinks/name?q=${searchInput}`);
    response = meals;
  } else {
    const { meals } = await requestData('drinks/name');
    response = meals;
  }

  if (!response || response.length === 0) {
    global.alert(messages.notFound);
  }
  return response || [];
};

export const fetchByFirstLetter = async (searchInput) => {
  let response;
  if (searchInput) {
    const { meals } = await requestData(`drinks/letter?q=${searchInput}`);
    response = meals;
  } else {
    const { meals } = await requestData('drinks/letter');
    response = meals;
  }

  if (!response || response.length === 0) {
    global.alert(messages.notFound);
  }
  return response || [];
};

export const fetchDrinksById = async (id) => {
  const { drinks } = await requestData(`/drinks/${id}`);
  if (!drinks || drinks.length === 0) {
    global.alert(messages.notFound);
  }
  return drinks || [];
};

export const fetchByType = async (searchType, searchInput) => {
  switch (searchType) {
  case 'ingredient':
    return fetchByIngredient(searchInput);

  case 'name':
    return fetchByName(searchInput);

  case 'first-letter':
    if (searchInput.length > 1) {
      global.alert(messages.invalidSearchInput);
      return [];
    }
    return fetchByFirstLetter(searchInput);

  case 'id':
    return fetchDrinksById(searchInput);

  default:
    break;
  }
};

export const fetchDrinks = async () => {
  const { drinks } = await requestData('/drinks/name');
  return drinks;
};

export const fetchDrinksCategories = async () => {
  const { drinks } = await requestData('/drinks/categories');
  return drinks;
};

export const fetchDrinksByCategory = async (category) => {
  const { drinks } = await requestData(`/drinks/category?q=${category}`);
  return drinks;
};
