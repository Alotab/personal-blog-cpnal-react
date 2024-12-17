import React from 'react'
import { Link } from 'react-router-dom'
import homeImge from "../assets/images/custome_home.avif"
import PostCard from './PostCard'




const Hero = () => {
  


  return (
    <div className='main-content'>
      <div className='middle-colume' id="post-container">
        <div className="community-post">
          <h2 className="community-name">DevWithCode</h2>
          <div className="community-post-headline">
              <img src={homeImge} alt="web-homepage-image" />
              <h4> Welcome to 📚 DevWithCode 🚀!</h4>
              <span>I'm so glad you're here. This is a place where I share my thoughts and ideas, showcase my work, and connect with other like-minded people.</span>
          </div>
            
          <div className="community-tags">
              <h5>Code 👌</h5>
              <h5>Articles ✍️</h5>
              <h5>Documentation 📚</h5>
              <h5>Production 🚀</h5>
          </div>
              <Link to={"/register"}>
                  <p>Create Account</p>
              </Link>
        </div>
        <PostCard />


      </div>
    </div>
    
  )
}

export default Hero