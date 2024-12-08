import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Hero = () => {
  const [posts, setPosts] = useState([]);

  const setPublishData = (item) => {
    const publishedData = new Date(item.publish);
    const formattedDate = publishedData.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric'
    })
    return formattedDate;
  }

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
                        <div className="author-profile">
                            <div className="author-image">
                                <Link to={"/portfolio"}><img src={item?.author?.profile_picture} alt="" /></Link>
                                
                            </div>
                            <div className="post-author-details">
                                    <Link to={"/portfolio"}><p>{item?.author?.first_name} {item?.author?.last_name}</p></Link>
                                    <p id="time-tag"  className="post-date">{getRealTimeDateFormat(item)} &middot;  {item?.read_time} read</p>
                            </div>
                            
                        </div>
                        <div className="post-header">
                            <Link><h4>{item?.title}</h4></Link>
                        </div>
                    </div>
                    )
                })}
            </div>
        </>
    );
};

export default Hero;












































// import React from 'react'
// import { Link } from 'react-router-dom'



// const PostCard = ({item}) => {

//   return (
//     <>
//         <h1>{item?.title}</h1>
//     </>
//   )
// }

// export default PostCard;


 // <div classNameName='middle-colume-post' id='middle-colume-post'>
    //     <div classNameName="post infinite-item ck-content">
    //         <div classNameName="author-profile">
    //             <div classNameName="author-image">
    //                 {/* <a href="{% url 'portfolio' %}"><img src="{{ post.author.profile_image.url }}" alt="author" /></a> */}
    //                 {/* <Link to={"/portfolio"}>{ item?.author?.profile_image.url }</Link> */}
                    
    //             </div>
    //             <div classNameName="post-author-details">
    //                 {/* <a href="#"><p>John Max</p></a> */}
    //                 {/* {% with author=post.author %} */}
    //                     {/* <a href="#"><p>{item?.author?.first_name} {item?.author?.last_name}</p></a> */}
    //                     {/* <p id="time-tag"  classNameName="post-date"> {item?.publish} read</p> */}
                        
    //                 {/* {% endwith %} */}
    //             </div>
    //         </div>

    //         <div classNameName="post-header">
    //             <a href="#">
    //                 {/* <h4>Blog Title</h4> */}
    //                 <h4>{ item?.title }</h4>
    //             </a>
    //         </div>
    //         <div classNameName="post-tags">
    //             <a classNameName="post-tag-chrome" href="#"><span>{item?.tags}</span></a>
    //         </div>
    //     </div>
    // </div>