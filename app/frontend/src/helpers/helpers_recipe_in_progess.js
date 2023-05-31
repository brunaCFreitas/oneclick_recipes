import { readObject, saveObject } from './localStorage';

export const newRecipe = (meals, drinks, typeOfUrl, magicNum) => ({
  id: meals.idMeal || drinks.idDrink,
  type: typeOfUrl.slice(0, magicNum.one),
  nationality: meals.strArea || '',
  category: meals.strCategory || drinks.strCategory,
  alcoholicOrNot: drinks.strAlcoholic || '',
  name: meals.strMeal || drinks.strDrink,
  image: meals.strMealThumb || drinks.strDrinkThumb,
});

export const callIngredients = (
  meals = undefined,
  drinks = undefined,
  isChecked,
  handleChecked,
) => {
  const magicNum = 20;
  const ingredients = [];
  const variable = meals !== undefined ? meals : drinks;
  for (let i = 1; i <= magicNum; i += 1) {
    if (variable[`strIngredient${i}`]) {
      // console.log(variable);
      ingredients.push(
        <li
          key={ i }
          data-testid={ `${i - 1}-ingredient-name-and-measure` }
        >
          <label
            htmlFor={ i }
            data-testid={ `${i - 1}-ingredient-step` }
            style={ { textDecoration:
              (
                isChecked(`strIngredient${i}`)
                  ? 'line-through solid rgb(0, 0, 0)'
                  : 'none'
              ),
            } }
          >
            <input
              id={ i }
              type="checkbox"
              name={ `strIngredient${i}` }
              onChange={ handleChecked }
              checked={ isChecked(`strIngredient${i}`) }
              value={ variable[`strIngredient${i}`] }
            />
            {variable[`strIngredient${i}`]}
            {' '}
            -
            {' '}
            {variable[`strMeasure${i}`]}
          </label>
        </li>,
      );
    }
  }
  return ingredients;
};

const magicNum = -1;

export const handleFinishRecipeBtnHelper = (meals, drinks, typeOfUrl) => {
  const localStorageLoad = readObject('doneRecipes', []);
  const doneRecipes = [...localStorageLoad];
  const date = new Date();
  const doneDate = date.toISOString();
  const doneRecipe = {
    id: meals.idMeal || drinks.idDrink,
    type: typeOfUrl.slice(0, magicNum),
    category: meals.strCategory || drinks.strCategory,
    alcoholicOrNot: drinks.strAlcoholic || '',
    name: meals.strMeal || drinks.strDrink,
    image: meals.strMealThumb || drinks.strDrinkThumb,
    doneDate,
    nationality: meals.strArea || '',
    tags: meals.strTags ? meals.strTags.split(',') : [],
  };
  doneRecipes.push(doneRecipe);
  saveObject('doneRecipes', doneRecipes);
};
