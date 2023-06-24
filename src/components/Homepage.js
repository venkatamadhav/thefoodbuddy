import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const Homepage = () => {
  const [DishesByLetter, setDishesByLetter] = useState([]);
  const [CurrentPage, setCurrentPage] = useState(1);
  const [input, setInput] = useState("");
  const [searchResults , setSearchResults] = useState([]);

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
  }, []);
  useEffect(() => {
    if (DishesByLetter) {
      const filteredResults = DishesByLetter.filter((dishes) => {
          return (
            (dishes.strMeal.toLowerCase().includes(input))
          );
      });
      setSearchResults(filteredResults);
    }
  }, [DishesByLetter, input]);
  
  const inputchange = (e) => {
    const inputvalue = e.target.value.toLowerCase();
    console.log(inputvalue);
    setInput(inputvalue);
  }
  const itemsperpage = 20;
  const previous=()=>{
    setCurrentPage(prevpage=>{return prevpage-1})
  }
  const next=()=>{
    setCurrentPage(prevpage=>{return prevpage+1})
  }
  const startIndex = (CurrentPage-1) * itemsperpage;
  const endIndex = startIndex + itemsperpage;
  const displayedItems = searchResults.slice(startIndex, endIndex);
  const totalPages = Math.ceil(searchResults.length / itemsperpage);
  
  return (
    <div className="bg-gray-300 min-h-screen">
      <div className="flex justify-center p-2">
          <input type="text" placeholder='Search your Meal here' onChange={inputchange} value={input} className='mx-8 w-full sm:w-3/4 bg-gray-100 px-6 py-2 rounded border-gray-900 border outline-none focus:ring-2 focus:ring-blue-500'/>
      </div>
      <div className="flex flex-wrap justify-center mx-auto">
        {displayedItems.length === 0 && input !== "" ? (
            <h2>No Items Found!!</h2>
          ) : (
            displayedItems.length === 0 ? (  
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
            displayedItems.map((meal, index) => (
              <div className='p-3' key={startIndex + index}>
                <Link to={`/meals/${meal.idMeal}`}>
                  <div className="bg-gray-200 p-4 rounded flex justify-center items-center flex-col  h-[400px]" key={startIndex + index}>
                    <img src={meal.strMealThumb} alt="Meal" className='h-[260px] w-[260px] sm:h-[320px] sm:w-[320px]'/>
                    <h4 className='text-center bold text-xl w-[260px] sm:w-[320px]'>{meal.strMeal}</h4>
                  </div>
                </Link>
              </div>
              ))
              )
          )}
      </div>
      <div className="container mx-auto flex flex-wrap justify-between pb-4">
      <button 
          onClick={previous}
          disabled={CurrentPage === 1}
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full disabled:bg-gray-700 ml-4'
          >Previous</button>
        <button 
          onClick={next}
          disabled={CurrentPage === totalPages}
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full disabled:bg-gray-700 mr-4'
          >Next
        </button>
      </div>
    </div>
  );
};

export default Homepage