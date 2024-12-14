import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { axiosPrivate } from '../app/axios';

import { getRealTimeDateFormat } from '../utils/usePostTimeLine';

const API_URL_IMAGE='http://127.0.0.1:8000/'
const Hero = () => {
  const [posts, setPosts] = useState([]);


  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axiosPrivate.get('/posts/');
        // console.log('API Response:', response.data);  // Log the response to see the structure
        setPosts(response.data);  // Update the state with the posts
      } catch (error) {
        console.error('Error fetching posts:', error);  // Handle error fetching data
      }
    };

    fetchPost();
  }, []);  // Empty dependency array to fetch only once


    return (
        <>
            <div className="middle-colume-post infinite-container" id="middle-colume-post">
                {posts.map((item, idx) => {
                    return (
                      <div className="post infinite-item ck-content" key={idx}>
                         <Link to={`/posts/${item.slug}/${item.id}`} key={item.id}> 
                            <div className="author-profile">
                                <div className="author-image">
                                    <Link to={"/portfolio"}><img src={item?.author_info?.profile_picture} alt={item?.author_info?.full_name} /></Link>
                                </div>
                                <div className="post-author-details">
                                    <p>{item?.author_info?.full_name}</p>
                                    <p id="time-tag"  className="post-date">{getRealTimeDateFormat(item)} &middot;  {item?.read_time} read</p>
                                </div>
                                
                            </div>
                            <div className="post-header">
                                <h4>{item?.title}</h4>
                            </div>
                        </Link>
                    </div>
                    )
                })}
            </div>
        </>
    );
};

export default Hero;