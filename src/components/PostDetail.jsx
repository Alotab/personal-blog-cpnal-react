import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useApiContext } from '../context/ApiProvider';
import getCSRFToken from '../utils/crsfToken';
import { formatDate } from '../utils/usePostTimeLine';
import PageNotFound from './PageNotFound';



const PostDetail = () => {
    const csrfToken = getCSRFToken();

    const { accessToken, auth, errMsg, setErrMsg } = useApiContext();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const buttonRef = useRef(null);
    const sociaMediaRefs = useRef([]);
    const socialButtonDivRef = useRef(null);

    const [post, setPost] = useState(null);
    const [socialLinks, setSocialLinks] = useState(false)
    const { slug, id } = useParams();
    
    const [isActive, setIsActive] = useState(false);
    const [mouseOverTxt, setMouseOverTxt] = useState(false);
    const [mouseOverComment, setMouseOverComment] = useState(false);
    const [mouseOverBookmark, setMouseOverBookmark] = useState(false);
    const [mouseOverLike, setMouseOverLike] = useState(false);


    // Show text when mouse over share icon
    const handleMouseOver = () => {
        setMouseOverTxt(true);
        setMouseOverBookmark(false);
    };

    // Show text when mouse over bookmark icon
    const handleBookmarkOver = () => {
        setMouseOverBookmark(true);
        setMouseOverTxt(false);
    }

    const handleComment = () => {
        setMouseOverComment(true);
        setMouseOverBookmark(false);
        setMouseOverTxt(false);
        setMouseOverLike(false);
    }

    const handleLike = () => {
        setMouseOverLike(true);
        setMouseOverComment(false);
        setMouseOverBookmark(false);
        setMouseOverTxt(false);
    }

    // Hide text when mouse leaves the div
    const handleMouseOut = () => {
        setMouseOverTxt(false);
        setMouseOverBookmark(false);
        setMouseOverComment(false);
        setMouseOverLike(false)
    };



    // Navigate Blog Link to social Media apps function
    const handleMediaLinks = (index) => {
        const mediaArray = sociaMediaRefs.current;
        mediaArray.forEach((MediaButton) => {
            MediaButton.addEventListener('click', (e) => {
                e.preventDefault();

                 // Get the URL of the current page
                const url = window.location.href;

                // Get a specific class [1] from a list of classes from one div
                const platform = MediaButton.classList[1]

                let shareUrl;
                switch (platform) {
                    case 'facebook':
                    shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
                    break;
                    case 'twitter':
                    shareUrl = `https://twitter.com/share?url=${encodeURIComponent(url)}`;
                    break;
                    case 'linkedin':
                    shareUrl = `https://www.linkedin.com/shareArticle?url=${encodeURIComponent(url)}`;
                    break;
                    case 'reddit':
                    shareUrl = `https://reddit.com/submit?url=${encodeURIComponent(url)}`;
                    break;
                    case 'whatsapp':
                    shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(url)}`;
                    break;
                }

                // Open a new window to share the URL
                window.open(shareUrl, '_blank');
            });
            
        });
    };

    // Function to copy Blog URL 
    const permalinkShare = (e) => {
        e.preventDefault();
    
        // Copy the URL to the clipboard
        const url = window.location.href;
        navigator.clipboard.writeText(url).then(() => {
          // Show the message
          setIsActive(true);
    
          // Hide the message after 1.5 seconds (1500 ms)
          setTimeout(() => {
            setIsActive(false);
          }, 1500);
        });
    }


    // Toggle over shareLink by clicking the Share icon 
    const onhandlePopOutButtons = () => {
        setSocialLinks(prevState => !prevState);
    };
     
    // Close the div if a user clicks outside of the button or the div
    const handleClickOutside = (e) => {
        if (socialButtonDivRef.current && !socialButtonDivRef.current.contains(e.target) && 
            buttonRef.current && !buttonRef.current.contains(e.target)) {
                setSocialLinks(false);  // Hide the div if clicked outside
        }
    };

   // API for deleting a POST
    const onHandleDelete = async (slug, pk) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this post?');
        if (!confirmDelete) return;
        try {
            const response = await fetch(`http://127.0.0.1:8000/auth/posts/${slug}/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `JWT ${accessToken}`, 
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken,  // Include the CSRF token here
                },
                credentials: 'include',  // Ensure cookies (including CSRF token) are sent
            });

            if(response.ok) {
                alert('Post deleted successfully');

                // Redirect to homepage after successful deletion
                navigate(from, { replace: true });
            navigate(from, { replace: true });
            } else {
                throw new Error('Failed to delete post');
            }
        } catch (error) {
            console.log('Failed to delete the post');
        }

    };

    // API for updating a POST
    const onHandleUpdate = async (slug, pk) => {

    }

    // Add event listener on mount and clean it up on unmount
    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
        document.removeEventListener('click', handleClickOutside);
        };
    }, []);


    // API data fetching
    useEffect(() => {
        const fetchPostDetail = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/auth/posts/${slug}/${id}`);
                setPost(response.data)
            } catch (error) {
                setErrMsg('Post not found');
                console.error('Error fetching post details:', error);
            }
        }
        fetchPostDetail();
    },[slug, id]);

    if (errMsg) {
        // If there's an error, render the PageNotFound component or an error message
        return <PageNotFound />
    }


    // Extract tagsArray after the post state is updated
    const tagsArray = post ? post.tags.split(',').map(tag => tag.trim()) : [];
    console.log(post);
    return (
       
        <>
        
            { post 
                ?   ( 
                    <div className="main-detail-post">
                        <div className="detail-column">
                            <div className="detail-post">
                                <img src={post.image} alt={post.title} className="post-image" />
                                <div className="main-post">
                                    <div className="main-post-author">
                                        <img src={post.author_info.profile_picture} alt={post.author.first_name} />
                                        <div className="author-name">
                                            <p className="author-name-link">{post.author.first_name} {post.author.last_name}</p>
                                            <p id="time-tag" className="publish">Posted on {formatDate(post.publish)} &middot; {post.read_time} read</p>
                                        </div>
                                        { auth.id == post.author ? 
                                            <>
                                                <div className="post-edit">
                                                    <Link to={`/auth/posts/${post.slug}/${post.id}`}>Update</Link>
                                                    {/* <a href="">Update</a> */}
                                                </div>
                                                <div className="post-delete" onClick={() => onHandleDelete(post.slug, post.id)}>
                                                    <Link>Delete</Link>
                                                </div>
                                            </>
                                         : 
                                            <></>
                                        }
                                    </div>
                                    <div className="main-post-headline">
                                        <h2>{post.title}</h2>
                                    </div>
                                    <div className="main-post-tags">
                                        <button><span id="tag-color" >react</span></button>
                                        {/* {post.map((tag, idx) => {
                                            <button><span id="tag-color">{ tag.tags }</span></button>
                                        })} */}
                                    
                                    </div>
                                    <div className="post-main-detail ck-content">
                                        <p>{post.content}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                
                
                        {/* <!--===================== external- share ===============================--> */}
                        <div className="external-share-container">
                            <div className="share-scroll share-scroll-position">
                                <div className="social-share">
                                    <i className="ri-heart-line share-like pop"
                                        onMouseOver={handleLike}
                                        onMouseOut={handleMouseOut}
                                    
                                    ></i>
                                    <div className="like-count"></div>
                                    <p className={mouseOverLike && !socialLinks ? 'pop-comment kat alert-active' : 'pop-like kat'}>Like this article</p>
                                </div>
                                <div className="social-share">
                                    <i className="ri-message-3-line share-comment pop"
                                        onMouseOver={handleComment}
                                        onMouseOut={handleMouseOut}
                                    
                                    ></i>
                                    <div className="comment-count"></div>
                                    {/* <i><BiCommentDots /></i> */}
                                    <p className={mouseOverComment && !socialLinks ? 'pop-comment kat alert-active' : 'pop-comment kat'}>Write a comment</p>
                                </div>
                                <div className="social-share">
                                    <i className="ri-bookmark-line share-bookmark pop"
                                        onMouseOver={handleBookmarkOver} 
                                        onMouseOut={handleMouseOut}
                                    ></i>
                                    
                                    <p className={mouseOverBookmark && !socialLinks ? 'pop-bookmark kat alert-active' : 'pop-bookmark kat'}>Add Bookmark</p>
                                </div>
                                <div className="social-share">
                                    {/* <i><GrShareOption /></i> */}
                                    <i className="ri-share-line share-share pop" 
                                        ref={buttonRef} 
                                        onClick={onhandlePopOutButtons} 
                                        onMouseOver={handleMouseOver} 
                                        onMouseOut={handleMouseOut}>
                                    </i>
                                    <p className={mouseOverTxt && !socialLinks ? 'pop-share kat alert-active' : 'pop-share kat'}>Share this article</p>
                                </div>

                                {socialLinks && (
                                    <div ref={socialButtonDivRef} className="social-scroll-wrapper">
                                        <div className="social-cs9 share-buttons">
                                            <a href="#" className="share-button reddit" ref={(el) => sociaMediaRefs.current[0] = el} onClick={() => handleMediaLinks(0)}>
                                                <i className="ri-reddit-fill"></i><p>Reddit</p>
                                            </a>
                                            <a href="#" className="share-button linkedin" ref={(el) => sociaMediaRefs.current[1] = el} onClick={() => handleMediaLinks(1)}>
                                                <i className="ri-linkedin-box-fill"></i><p>Linkedin</p>
                                            </a>
                                            <a href="#" className="share-button twitch" ref={(el) => sociaMediaRefs.current[2] = el} onClick={() => handleMediaLinks(2)}>
                                                <i className="ri-twitch-fill"></i><p>Twitch</p>
                                            </a>
                                            <a href="#" className="share-button whatsapp" ref={(el) => sociaMediaRefs.current[3] = el} onClick={() => handleMediaLinks(3)}>
                                                <i className="ri-whatsapp-fill"></i><p>Whatsapp</p>
                                            </a>
                                            <a href="#" className="share-button facebook" ref={(el) => sociaMediaRefs.current[4] = el} onClick={() => handleMediaLinks(4)}>
                                                <i className="ri-facebook-circle-fill"></i> <p>Facebook</p>
                                            </a>
                                            <a className="share-button twitter" href="#" ref={(el) => sociaMediaRefs.current[5] = el} onClick={() => handleMediaLinks(5)}>
                                                <i className="ri-twitter-fill"></i><p>Twitter</p>
                                            </a>
                                            <a href="#" className="permalink"  onClick={permalinkShare}>
                                                <i className="ri-links-line"></i><p>Permalink</p>
                                            </a>
                                        </div>
                                    </div>
                                )}; 
                                
                          
                                <div className={isActive ? 'permalink-message show-permalink-message' : 'permalink-message'}>
                                    <i className="ri-checkbox-circle-line"></i>
                                    <p>Copied article link</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    )
                : 
                (
                    <p>Loading...</p>
                )
            
            }
        </>
    );
};

export default PostDetail;