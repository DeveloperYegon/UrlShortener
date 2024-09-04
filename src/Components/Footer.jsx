import React from 'react'

function Footer() {
    const year = new Date().getFullYear();
  return (
   <footer>
        <div className='flex justify-center bg-[#182B5C] text-white p-5'>
        <p>© {year} UrlShort. All rights reserved. BuildBy <a className='text-[#ED7D3B]' href='https://gideon-hazel.vercel.app'>DeveloperYegon</a></p> 
        </div>
   </footer>
  )
}

export default Footer