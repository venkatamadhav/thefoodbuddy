import React, { useCallback , useState } from 'react'

const Searchpage = () => {
    const [SearchValue, setSearchValue] = useState("");
    const [MealData, setMealData] = useState([]);
    const [SearchPerformed, setSearchPerformed] = useState(false);
  
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
          setMealData(MealData.meals || []);
          setSearchPerformed(true);
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
          {SearchPerformed && MealData.length === 0 ? (
            <h2>No Meals Found!! Please try again</h2>
          ) : (
            MealData.map((meal) => (
              <div className="Meals-grid" key={meal.idMeal}>
                <img src={meal.strMealThumb} alt="Meal" />
                <h4>{meal.strMeal}</h4>
              </div>
            ))
          )}
        </div>
      </div>
    )
}

export default Searchpage