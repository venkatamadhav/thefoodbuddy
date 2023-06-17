import React, { useEffect , useState } from 'react'

const Categories = () => {
  const [MealData, setMealData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
        const MealData = await res.json();
        console.log(MealData.categories);
        setMealData(MealData.categories || []);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);
  
  return (
    <div className="Categories">
      <div className="categories-types">
        {MealData.length === 0 ? (
          <h2>Loading...</h2>
        ) : (
          MealData.map((meal) => (
            <div className="categories-grid" key={meal.idCategory}>
              <img src={meal.strCategoryThumb} alt="Category" />
              <h4>{meal.strCategory}</h4>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default Categories