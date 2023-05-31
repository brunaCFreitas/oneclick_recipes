export const parseJSONResponse = async (response, defaultValue) => {
  try {
    return await response.json();
  } catch {
    return defaultValue;
  }
};

export const finishConstructor = (recipe) => ({
  category: recipe.strCategory,
  alcoholicOrNot: recipe.alcoholicOrNot || '',
  name: recipe.strMeal || recipe.strDrink,
  image: recipe.strMealThumb || recipe.strDrinkThumb,
  nationality: recipe.strArea || '',
  tags: recipe.strTags || '',
  type: recipe.strMeal ? 'meal' : 'drink',
});
