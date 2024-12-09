import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { BiShareAlt } from "react-icons/bi";
// import { CiBookmark } from 'react-icons/ci';
import { BiCommentDots } from "react-icons/bi";
import { FaRegHeart } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa6";
import { GrShareOption } from "react-icons/gr";



const PostDetail = () => {
    const [post, setPost] = useState(null);
    const { slug, id } = useParams();
    // console.log("Slug:", slug);
    // console.log("ID:", id);

    useEffect(() => {
        const fetchPostDetail = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/posts/${slug}/${id}/`);
                setPost(response.data)
            } catch (error) {
                console.error('Error fetching post details:', error);
            }
        }
        fetchPostDetail();
    },[slug, id])

    // Extract tagsArray after the post state is updated
    const tagsArray = post ? post.tags.split(',').map(tag => tag.trim()) : [];
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
                            <img src={post.author.profile_picture} alt={post.author.first_name} />
                            <div className="author-name">
                                <p className="author-name-link">{post.author.first_name} {post.author.last_name}</p>
                                <p id="time-tag" className="publish">Posted on { post.publish} &middot; {post.read_time} read</p>
                            </div>
                            {/* {% if request.user.is_authenticated %} */}
                            <div className="post-edit">
                                {/* <a href="{% url 'blog:post-update' post.slug post.pk %}">Update</a> */}
                            </div>
                            <div className="post-delete">
                                {/* <a href="{% url 'blog:post-delete' post.slug post.pk %}">Delete</a> */}
                            </div>
                            {/* {% endif %} */}
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
                        <i className="ri-heart-line share-like pop"></i>
                        <div className="like-count"></div>
                        <i><FaRegHeart /></i>
                        <p className="pop-like kat">Like this article</p>
                    </div>
                    <div className="social-share">
                        <i className="ri-message-3-line share-comment pop"></i>
                        <div className="comment-count"></div>
                        <i><BiCommentDots /></i>
                        
                        <p className="pop-comment kat">Write a comment</p>
                    </div>
                    <div className="social-share">
                        <i className="ri-bookmark-line share-bookmark pop"></i>
                        <i><FaRegBookmark /></i>
                        <p className="pop-bookmark kat">Add Bookmark</p>
                    </div>
                    <div className="social-share">
                        <i><GrShareOption /></i>
                        <i className="ri-share-line share-share pop"></i>
                    </div>

                    
                    <div className="social-scroll-wrapper">
                        <div className="social-cs9 share-buttons">
                            <a href="#" className="share-button reddit">
                                <i className="ri-reddit-fill"></i><p>Reddit</p>
                            </a>
                            <a href="#" className="share-button linkedin">
                                <i className="ri-linkedin-box-fill"></i><p>Linkedin</p>
                            </a>
                            <a href="#" className="share-button twitch">
                                <i className="ri-twitch-fill"></i><p>Twitch</p>
                            </a>
                            <a href="#" className="share-button whatsapp">
                                <i className="ri-whatsapp-fill"></i><p>Whatsapp</p>
                            </a>
                            <a href="#" className="share-button facebook">
                                <i className="ri-facebook-circle-fill"></i> <p>Facebook</p>
                            </a>
                            <a className="share-button twitter" href="#">
                                <i className="ri-twitter-fill"></i><p>Twitter</p>
                            </a>
                            <a href="#">
                                <i className="ri-links-line"></i><p>Permalink</p>
                            </a>
                        </div>
                    </div>
                    <div className="permalink-message">
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