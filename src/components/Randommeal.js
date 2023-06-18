import React, { useEffect , useState } from 'react'
import YouTube from 'react-youtube';

const Randommeal = () => {
  const [MealData, setMealData] = useState([]);
  const fetchData = async () => {
    try {
      const res = await fetch(`https://www.themealdb.com/api/json/v1/1/random.php`);
      const data = await res.json();
      console.log(data.meals[0]);
      setMealData(data.meals[0] || []);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const styles = {
    American: "#BF0A30",
    British: "#012169",
    Canadian: "#FF0000",
    Chinese: "#FFDE00",
    Croatian: "#0B3D91",
    Dutch: "#AE1C28",
    Egyptian: "#E2001A", 
    Filipino: "#0038A8",
    French: "#002395",
    Greek: "#0000FF",
    Indian: "#FF9933",
    Irish: "#169B62",
    Italian: "#008C45",
    Jamaican: "#FFBF00",
    Japanese: "#BC002D",
    Kenyan: "#006600",
    Malaysian: "#CC0000",
    Mexican: "#006847",
    Moroccan: "#CE1126",
    Polish: "#DC143",
    Portuguese: "#006600",
    Russian: "#0039A6",
    Spanish: "#F1BF00",
    Thai: "#FF0000",
    Tunisian: "#E70013",
    Turkish: "#E30A17",
    Unknown: "#23C4ED",
    Vietnamese: "#FFC72C",
    Beef: "#8B0000",
    Chicken: "#FFD700",
    Dessert: "#FF1493",
    Lamb: "#8F9779",
    Miscellaneous: "#808080",
    Pasta: "#FFA500",
    Pork: "#FF6347",
    Seafood: "#1E90FF",
    Side: "#7CFC00",
    Starter: "#FF4500",
    Vegan: "#008000",
    Vegetarian: "#228B22",
    Breakfast: "#FFD700",
    Goat: "#964B00"
  };
  return (
    <div className='Random Meal'>
    { MealData ? 
       ( <>
          <div>
            <button onClick={fetchData}>Generate Random Meal</button>
          </div>
          <div className="name">
            <h1>{MealData.strMeal}</h1>
          </div>
          <div className="flex justify-center m-2">
            <h3 className='text-white font-semibold mr-2 px-4 rounded capitalize'style={{backgroundColor:styles[MealData.strArea]}}>{MealData.strArea}</h3>
            <h3 className='text-white font-semibold mr-2 px-4 rounded capitalize' style={{backgroundColor:styles[MealData.strCategory]}}>{MealData.strCategory}</h3>
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

export default Randommeal