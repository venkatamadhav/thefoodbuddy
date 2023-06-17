import React, { useEffect , useState } from 'react'

const Randommeal = () => {
  const [MealData, setMealData] = useState([]);
  const fetchData = async () => {
    try {
      const res = await fetch(`https://www.themealdb.com/api/json/v1/1/random.php`);
      const MealData = await res.json();
      console.log(MealData.meals);
      setMealData(MealData.meals || []);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className='random'>
      {MealData.length === 0 ? (
          <h2>Loading...</h2>
        ) : (
          MealData.map((meal) => (
            <div className="random-grid" key={meal.idMeal}>
              <div className="random-dish">
                <h3>{meal.strMeal}</h3>
              </div>
              <div className="random-grid-controls">
                <img src={meal.strMealThumb} alt="Category" />
                <button onClick={fetchData}>Generate Random Meal</button>
              </div> 
              <div className='random-grid-instructions'>
                <h4>Instructions:</h4>
                <p>{meal.strInstructions}</p>
              </div>            
            </div>
          ))
        )}
    </div>
  )
}

export default Randommeal