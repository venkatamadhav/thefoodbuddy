import React, { useCallback } from 'react'
import { useState , useEffect} from 'react'

const Homepage = () => {
  const [SearchValue, setSearchValue] = useState("");
  const [MealData, setMealData] = useState();
  
  const Searchmeal = (e) => {
    setSearchValue(e.target.value.toLowerCase());
    console.log(SearchValue)
  }

  const SearchMeal = useCallback(() => {
    const fetchData = async () => {
      try {
        console.log(SearchValue)
        const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${SearchValue}`);
        const MealData = await res.json();
        console.log(MealData.meals);
        setMealData(MealData.meals);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [SearchValue]);
  
  return (
    <div className="Home">
      <div className="home-search">
        <input type="text" placeholder='Enter a Meal Name' value={SearchValue} onChange={Searchmeal}/>
        <button onClick={SearchMeal}>Search Meal</button>
      </div>
      <div className="home-meals">
        { MealData ? (
          MealData.map((meal) => (
          <div className='Meals-grid' key={meal.idMeal}>
            <img src={meal.strMealThumb} alt="Meal"/>
            <h4>{meal.strMeal}</h4>
          </div>
        ))
        ) : (
          <h2>No Meals Found!! Please try again</h2>
        )
        }
      </div>
    </div>
  )
}

export default Homepage