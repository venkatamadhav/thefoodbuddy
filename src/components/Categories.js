import React, { useEffect , useState } from 'react'
import { Link } from 'react-router-dom';

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
  document.title = `The Food Buddy - Categories`;
  return (
    <div className="bg-gray-300">
      <div className="flex flex-wrap justify-center mx-auto">
        {MealData.length === 0 ? (
          <h2>Loading...</h2>
        ) : (
          MealData.map((meal) => (
            <div  key={meal.idCategory} className='p-4'>
              <Link to={`/category/${meal.strCategory}`}>
                <div className="bg-gray-200 p-4 rounded flex justify-center items-center flex-col" key={meal.idCategory}>
                  <img src={meal.strCategoryThumb} alt="Category" className='h-[220px] w-[260px] sm:h-[260px] sm:w-[300px] p-2' />
                  <h4 className='text-center bold text-2xl '>{meal.strCategory}</h4>
                </div>
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default Categories