import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { fetchByType as fetchMealsById } from '../services/mealAPI';
import { fetchByType as fetchDrinksById } from '../services/cockTailAPI';

import '../styles/recipeDetails.css';
import MealDetails from '../components/MealDetails';
import DrinkDetails from '../components/DrinkDetails';

export default function RecipeDetails() {
  const [result, setResult] = useState();

  const { id } = useParams();
  const location = useLocation();

  const path = location.pathname;
  const verifyPath = path === `/meals/${id}`;

  useEffect(() => {
    const fetchData = async () => {
      if (verifyPath) {
        const response = await fetchMealsById('id', id);
        setResult(response);
        return;
      }
      const response = await fetchDrinksById('id', id);
      setResult(response);
    };

    fetchData();
  }, [verifyPath, id]);

  if (!result) { return <div>Loading...</div>; }
  return (
    <div className="recipeDetailContainer">
      { verifyPath
        ? <MealDetails result={ result[0] } />
        : <DrinkDetails result={ result[0] } />}
    </div>
  );
}
