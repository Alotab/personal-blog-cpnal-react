

import React from 'react'
import Sidebar from './Sidebar'
import Hero from './Hero'
import RightSideBar from './RightSideBar'
import Navbar from './Navbar'

const Homepage = () => {
  return (
    <div className='main-content'>
        <Navbar />
        {/* <Sidebar /> */}
        <Hero />
        {/* <RightSideBar /> */}
    </div>
  )
}

export default Homepage