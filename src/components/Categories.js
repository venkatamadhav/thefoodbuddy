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
    <div className="bg-gray-300 min-h-screen">
      <div className="flex flex-wrap justify-center mx-auto">
        {MealData.length === 0 ? (
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className='h-10 w-10'>
            <g id="SVGRepo_bgCarrier" strokeWidth={0} />
            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
            <g id="SVGRepo_iconCarrier">
              {" "}
              <path
                d="M12 2.99988V5.99988M12 20.9999V17.9999M4.20577 16.4999L6.80385 14.9999M21 11.9999H18M16.5 19.7941L15 17.196M3 11.9999H6M7.5 4.20565L9 6.80373M7.5 19.7941L9 17.196M19.7942 16.4999L17.1962 14.9999M4.20577 7.49988L6.80385 8.99988"
                stroke="#000000"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />{" "}
            </g>
          </svg>
        ) : (
          MealData.map((meal) => (
            <div  key={meal.idCategory} className='p-4'>
              <Link to={`/category/${meal.strCategory}`}>
                <div className="bg-gray-200 p-4 rounded flex justify-center items-center flex-col hover:scale-105 transition duration-300 z-10" key={meal.idCategory}>
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