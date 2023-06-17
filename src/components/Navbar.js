import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="heading">
        <h1>TheFoodBuddy</h1>
      </div>
      <div className="navbar-links">
        <ul>
          <Link to="/"><li>Home</li></Link>
          <Link to="/categories"><li>Categories</li></Link>
          <Link to="/randommeal"><li>Random</li></Link>
        </ul>
      </div>
    </div>
  )
}

export default Navbar