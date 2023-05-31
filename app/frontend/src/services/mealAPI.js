import { requestData } from '../helpers/fetch';

const messages = {
  notFound: 'Sorry, we haven\'t found any recipes for these filters.',
  invalidSearchInput: 'Your search must have only 1 (one) character',
};

export const fetchByIngredient = async (searchInput) => {
  let response;
  if (searchInput) {
    const { meals } = await requestData(`meals/ingredient?q=${searchInput}`);
    response = meals;
  } else {
    const { meals } = await requestData('meals/ingredients');
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
    const { meals } = await requestData(`meals/name?q=${searchInput}`);
    response = meals;
  } else {
    const { meals } = await requestData('meals/name');
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
    const { meals } = await requestData(`meals/letter?q=${searchInput}`);
    response = meals;
  } else {
    const { meals } = await requestData('meals/letter');
    response = meals;
  }

  if (!response || response.length === 0) {
    global.alert(messages.notFound);
  }
  return response || [];
};

export const fetchMealsById = async (id) => {
  const { meals } = await requestData(`/meals/${id}`);
  if (!meals || meals.length === 0) {
    global.alert(messages.notFound);
  }
  return meals || [];
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
    return fetchMealsById(searchInput);

  default:
    break;
  }
};

export const fetchMeals = async () => {
  const { meals } = await requestData('/meals/name');
  return meals;
};

export const fetchMealsCategories = async () => {
  const { meals } = await requestData('/meals/categories');
  return meals;
};

export const fetchMealsByCategory = async (category) => {
  const { meals } = await requestData(`/meals/category?q=${category}`);
  return meals;
};
