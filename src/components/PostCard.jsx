import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Hero = () => {
  const [posts, setPosts] = useState([]);

//   const setPublishData = (item) => {
//     const publishedData = new Date(item.publish);
//     const formattedDate = publishedData.toLocaleDateString('en-US', {
//         month: 'short',
//         day: 'numeric'
//     })
//     return formattedDate;
//   }

  const getRealTimeDateFormat = (item) => {
    const now = new Date();
    const difference = now - new Date(item.publish);
    const minutes = Math.floor(difference / 60000);
  
    if (minutes === 0) {
      return "Just now";
    } else if (minutes === 1) {
      return "1 min ago";
    } else if (minutes < 60) {
      return `${minutes} mins ago`;
    } else if (minutes < 1440) {
      return "Today";
    } else if (minutes < 43200) {
      return "Yesterday";
    } else {
      const monthsAgo = Math.floor(minutes / 43200);
      const formattedDate = new Date(date).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric'
      });
      return `${formattedDate} (${monthsAgo} months ago)`;
    }
  }


  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/posts/');
        console.log('API Response:', response.data);  // Log the response to see the structure
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
                                    <Link to={"/portfolio"}><img src={item?.author?.profile_picture} alt={item?.author?.first_name} /></Link>
                                </div>
                                <div className="post-author-details">
                                    <p>{item?.author?.first_name} {item?.author?.last_name}</p>
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