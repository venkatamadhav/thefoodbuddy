import React from 'react'
import { Link } from 'react-router-dom'
import Logo from "../Logo.png"

const Navbar = () => {
  return (
    <div className="bg-black text-white flex justify-between items-center w-full h-14 sticky top-0">
      <Link to="/">
        <div className="ml-4">
          {/* <h1>The Food <span className='text-orange-300'>Buddy</span></h1> */}
          <img src={Logo} className="h-12" alt='logo'/>
        </div>
      </Link>
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