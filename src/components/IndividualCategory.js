import React, { useEffect , useState } from 'react'
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const IndividualCategory = () => {
    const { id } = useParams();
    const [MealData, setMealData] = useState([]);
    const [CurrentPage, setCurrentPage] = useState(1);
    const [input, setInput] = useState("");
    const [searchResults , setSearchResults] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${id}`);
            const data = await res.json();
            console.log(data.meals);
            setMealData(data.meals || []);
          } catch (err) {
            console.log(err);
          }
        };
        fetchData();
      }, [id]);

      useEffect(() => {
        if (MealData) {
          const filteredResults = MealData.filter((dishes) => {
              return (
                (dishes.strMeal.toLowerCase().includes(input))
              );
          });
          console.log("Running Search")
          setSearchResults(filteredResults);
        }
      }, [MealData, input]);
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
    document.title = `TheFoodBuddy - ${id}`;
    const totalPages = Math.ceil(searchResults.length / itemsperpage);

  return (
    <div className="bg-gray-300">
        <div className="flex justify-center p-2">
          <input type="text" placeholder='Search your Meal here' onChange={inputchange} value={input} className='mx-8 w-full sm:w-3/4 bg-gray-100 px-6 py-2 rounded border border-gray-900 outline-none focus:ring-2 focus:ring-blue-500'/>
        </div>
      <div className="flex flex-wrap justify-center mx-auto">
        {displayedItems.length === 0 && input !== "" ? (
            <h2>No Items Found!!</h2>
            ) : (
            displayedItems.length === 0 ? (
                <h2>Loading!!</h2>
            ) : (
            displayedItems.map((meal, index) => (
              <div key={startIndex + index} className='p-3'>
                <Link to={`/meals/${meal.idMeal}`} >
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
  )
}

export default IndividualCategory