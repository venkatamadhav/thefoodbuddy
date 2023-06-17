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
      console.log("Running Search")
      setSearchResults(filteredResults);
    }
  }, [DishesByLetter, input]);
  
  const inputchange = (e) => {
    const inputvalue = e.target.value.toLowerCase();
    console.log(inputvalue);
    setInput(inputvalue);
  }
  const itemsperpage = 24;
  const previous=()=>{
    setCurrentPage(prevpage=>{return prevpage-1})
  }
  const next=()=>{
    setCurrentPage(prevpage=>{return prevpage+1})
  }
  const startIndex = (CurrentPage-1) * itemsperpage;
  const endIndex = startIndex + itemsperpage;
  const displayedItems = searchResults.slice(startIndex, endIndex);
  document.title = `The Food Buddy`;
  const totalPages = Math.ceil(searchResults.length / itemsperpage);
  
  return (
    <div className="bg-gray-300">
      <div className="flex justify-center p-2">
          <input type="text" placeholder='Search your Meal here' onChange={inputchange} value={input} className='mx-8 w-full sm:w-3/4 bg-gray-100 px-6 py-2 rounded border outline-none focus:ring-2 focus:ring-blue-500'/>
      </div>
      <div className="flex flex-wrap justify-center mx-auto">
        {displayedItems.length === 0 && input !== "" ? (
            <h2>No Items Found!!</h2>
          ) : (
            displayedItems.length === 0 ? (
              <h2>Loading!!</h2>
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