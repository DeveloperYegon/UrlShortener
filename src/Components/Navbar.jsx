import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  const now = new Date();

  // Get the current date
  const date = now.toLocaleDateString();
   // Get the current time
   const time = now.toLocaleTimeString();
   const dateTime = `${date} ${time}`;
  return (
    <header>
        <nav className='flex justify-around h-20  bg-[#182B5C] sticky top-0 items-center border-b-2 '>
            <h1 className='text-white'>
              <Link to='/'>
              UrlShort
              </Link>
              </h1>
            <button className='text-white'>{dateTime}</button>
        </nav>
    </header>
  )
}

export default Navbar