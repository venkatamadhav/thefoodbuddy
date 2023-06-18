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
    <div className='bg-gray-300'>
    { MealData ? 
       ( <>
          <div className='text-center md:text-right pt-2 md:pr-2'>
            <button onClick={fetchData} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full'>Generate Random Meal</button>
          </div>
          <div className="text-center md:text-3xl">
            <h1>{MealData.strMeal}</h1>
          </div>
          <div className="flex justify-center m-2">
            <h3 className='text-white font-semibold mr-2 px-4 rounded capitalize'style={{backgroundColor:styles[MealData.strArea]}}>{MealData.strArea}</h3>
            <h3 className='text-white font-semibold mr-2 px-4 rounded capitalize' style={{backgroundColor:styles[MealData.strCategory]}}>{MealData.strCategory}</h3>
          </div>
          <div className='flex flex-col md:flex-row md:mb-4'>
            <div className="flex-1 flex justify-center">
              <img src={MealData.strMealThumb} alt="" className='rounded w-[90%]'/>
            </div>
            <div className='flex-1'>
              <div className='m-4 md:m-0'>
                <h3 className='font-bold'>Instructions:</h3>
                <p className='text-justify md:mr-6'>{MealData.strInstructions}</p>
              </div>
              <div className="m-4 md:mt-4">
                <h3 className='font-bold'>Ingredients:</h3>
                <ul>
                {Object.entries(MealData).map(([key, value]) => {
                  if (key.startsWith('strIngredient') && value) {
                    const ingredientNumber = key.replace('strIngredient', '');
                    const measureKey = `strMeasure${ingredientNumber}`;
                    const measureValue = MealData[measureKey];
                    return (
                      <li key={key} className='mr-2 capitalize'>
                        {`${ingredientNumber}. ${value} - ${measureValue}`}
                      </li>
                    );
                  }
                  return null;
                })}
                </ul>
              </div>
            </div>
          </div>
          {MealData.strYoutube && (
          <div className='flex flex-col items-center'>
           <h2 className='font-extrabold'>Preparation Video:</h2>
           <div className="m-4">
              <YouTube videoId={new URL(MealData.strYoutube).searchParams.get("v")} />
            </div>
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