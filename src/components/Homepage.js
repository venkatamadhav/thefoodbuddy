import React, { useEffect, useState } from 'react'

const Homepage = () => {
  const [DishesByLetter, setDishesByLetter] = useState([]);
  const [CurrentPage, setCurrentPage] = useState(1);

  const fetchData = async () => {
    try {
      const alphabet = ["A", "B", "C", "D", "E", "F", "J", "I", "J", "k", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
      const dishList = [];
      for (const letter of alphabet) {
        const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`);
        const data = await res.json();
        const dishes = data.meals || [];

        if (dishes.length > 0) {
          dishList.push(...dishes);
        }
      }
      setDishesByLetter(dishList);
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    fetchData();
  }, [])
  const itemsperpage = 20;
  const previous=()=>{
    setCurrentPage(prevpage=>{return prevpage-1})
  }
  const next=()=>{
    setCurrentPage(prevpage=>{return prevpage+1})
  }
  const startIndex = (CurrentPage-1) * itemsperpage;
  const endIndex = startIndex + itemsperpage;
  const displayedItems = DishesByLetter.slice(startIndex, endIndex);
  document.title = `Pokemon`;
  const totalPages = Math.ceil(DishesByLetter.length / itemsperpage);
  
  return (
    <div className="Home">
      <div className="home-search">
          <input type="text" placeholder='Enter a Meal Name'/>
          <button>Search Meal</button>
      </div>
      <div className="dishes-container">
        {displayedItems.length === 0 ? (
          <h2>Loading!!</h2>
        ) : (
          displayedItems.map((meal) => (
              <div className="Meals-grid" key={meal.idMeal}>
                <img src={meal.strMealThumb} alt="Meal" />
                <h4>{meal.strMeal}</h4>
              </div>
            ))
        )}
      </div>
      <div className="buttons">
      <button 
          onClick={previous}
          disabled={CurrentPage === 1}
          >Previous</button>
        <button 
          onClick={next}
          disabled={CurrentPage === totalPages}
          >Next
        </button>
      </div>
    </div>
  );
};

export default Homepage