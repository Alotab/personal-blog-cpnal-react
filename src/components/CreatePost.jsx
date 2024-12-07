import React, { useState } from 'react'
import EditorBox from './EditorBox'
import { Link } from 'react-router-dom';
import { FaArrowLeftLong } from "react-icons/fa6";

const CreatePost = () => {
 
  return (
    <>
      <div className="wrtie-blog"><h1>BE THE MAN YOU WANT TO BE</h1></div>
      <div className="create-content">
        <div className="container" id='create-post-container'>
          <div>
            <FaArrowLeftLong />
            <Link to={"/"}>Homepage</Link>
          </div>
          <EditorBox />
         </div>
       </div>
    </>
  )
}

export default CreatePost