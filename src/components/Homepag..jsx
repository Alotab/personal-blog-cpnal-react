

import React from 'react'
import Sidebar from './Sidebar'
import Hero from './Hero'
import PostCard from './PostCard'

const Homepage = () => {
  return (
    <div className='main-content'>
        <Sidebar />
        <Hero />
    </div>
  )
}

export default Homepage