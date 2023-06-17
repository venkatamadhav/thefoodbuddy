import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className="bg-black text-white flex justify-between items-center w-full h-14 sticky top-0">
      <div className="ml-4 text-3xl">
        <h1>The Food <span className='text-orange-300'>Buddy</span></h1>
      </div>
      <div className="navbar-links">
        <ul className='flex'>
          <Link to="/"><li className='mr-6 text-xl bg-[#5c5c5c] p-2.5 rounded transition-all ease duration-300 hover:text-amber-400'>Home</li></Link>
          <Link to="/categories"><li className='mr-6 text-xl bg-[#5c5c5c] p-2.5 rounded transition-all ease duration-300 hover:text-amber-400'>Categories</li></Link>
          <Link to="/randommeal"><li className='mr-6 text-xl bg-[#5c5c5c] p-2.5 rounded transition-all ease duration-300 hover:text-amber-400'>Random</li></Link>
        </ul>
      </div>
    </div>
  )
}

export default Navbar