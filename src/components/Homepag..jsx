

import React from 'react'
import Sidebar from './Sidebar'
import Hero from './Hero'
import RightSideBar from './RightSideBar'

const Homepage = () => {
  return (
    <div className='main-content'>
        <Sidebar />
        <Hero />
        <RightSideBar />
    </div>
  )
}

export default Homepage