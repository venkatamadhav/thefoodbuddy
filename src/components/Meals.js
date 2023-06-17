import React, { useEffect , useState } from 'react'
import { useParams } from 'react-router-dom';
import YouTube from 'react-youtube';

const Meals = () => {
  const { id } = useParams();
  const [MealData, setMealData] = useState([]);
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        const data = await res.json();
        console.log(data.meals[0]);
        setMealData(data.meals[0] || []);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [id]);
  document.title = `${MealData?.strMeal || "Loading..."}`;
  return (
    <div className='Meal data'>
    { MealData ? 
       ( <>
          <div className="name">
            <h1>{MealData.strMeal}</h1>
          </div>
          <div className="category area">
            <h3>{MealData.strArea}</h3>
            <h3>{MealData.strCategory}</h3>
          </div>
          <div className="meal-photo">
            <img src={MealData.strMealThumb} alt="" />
          </div>
          <div className="instructions">
            <p>{MealData.strInstructions}</p>
          </div>
          <div className="ingredients">
            <h3>Ingredients:</h3>
            <ul>
            {Object.entries(MealData).map(([key, value]) => {
              if (key.startsWith('strIngredient') && value) {
                const ingredientNumber = key.replace('strIngredient', '');
                const measureKey = `strMeasure${ingredientNumber}`;
                const measureValue = MealData[measureKey];
                return (
                  <li key={key}>
                    {`${value} - ${measureValue}`}
                  </li>
                );
              }
              return null;
            })}
            </ul>
          </div>
          {MealData.strYoutube && (
            <div className="youtube-video">
              <YouTube videoId={new URL(MealData.strYoutube).searchParams.get("v")} />
            </div>
          )}
       </>
       ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}

export default Meals