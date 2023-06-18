import React , {useState} from 'react'
import { Link } from 'react-router-dom'
import Logo from "../Logo.png"
import { GiHamburgerMenu } from 'react-icons/gi';

const Navbar = () => {

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };


  return (
    <div className="bg-black text-white flex justify-between items-center w-full h-16 sticky top-0">
      <Link to="/">
        <div className="ml-4">
          {/* <h1>The Food <span className='text-orange-300'>Buddy</span></h1> */}
          <img src={Logo} className="h-16" alt='logo'/>
        </div>
      </Link>
      <div className=" hidden md:block">
        <ul className='flex'>
          <Link to="/"><li className='mr-4 text-xl p-2 rounded transition-all ease duration-300 hover:text-amber-400'>Home</li></Link>
          <li className="border-r border-gray-300 mr-2"></li>
          <Link to="/categories"><li className='mr-4 text-xl p-2 rounded transition-all ease duration-300 hover:text-amber-400'>Categories</li></Link>
          <li className="border-r border-gray-300 mr-2"></li>
          <Link to="/randommeal"><li className='mr-6 text-xl p-2 rounded transition-all ease duration-300 hover:text-amber-400'>Random</li></Link>
        </ul>
      </div>
      <div className='md:hidden'>
        <div className='md:hidden text-white text-2xl p-2'>
          <GiHamburgerMenu onClick={toggleMenu}/>
        </div>
        {isMenuOpen && (
          <div className="block md:mr-4">
            <ul className="p-2 mt-2 rounded bg-[#5c5c5c]">
              <Link to="/"><li className='mt-10 text-xl  p-1 rounded mb-2 transition-all ease duration-300 hover:text-amber-400' onClick={toggleMenu}>Home</li></Link>
              <li className="border-b border-gray-300 my-1"></li>
              <Link to="/categories"><li className='text-xl  p-1 rounded mb-2 transition-all ease duration-300 hover:text-amber-400' onClick={toggleMenu}>Categories</li></Link>
              <li className="border-b border-gray-300 my-1"></li>
              <Link to="/randommeal"><li className='text-xl  p-1 rounded mb-2 transition-all ease duration-300 hover:text-amber-400' onClick={toggleMenu}>Random</li></Link>
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

export default Navbar