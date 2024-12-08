import React from 'react'



const PostDetail = () => {
    
  return (
    <>
        <div className="main-detail-post">
            <div className="detail-column">
                <div className="detail-post">
                    <img src="{{ post.image.url }}" alt="post-image" className="post-image" />
                    <div className="main-post">
                        <div className="main-post-author">
                            <img src="{{ post.author.profile_image.url }}" alt="{{ post.title }}" />
                            <div className="author-name">
                                {/* <p className="author-name-link">{{ post.author }}</p> */}
                                {/* <p id="time-tag" className="publish">Posted on {{ post.publish |date:'M d'}} &middot; {{ post.get_readtime }} read</p> */}
                            </div>
                            {/* {% if request.user.is_authenticated %} */}
                            <div className="post-edit">
                                <a href="{% url 'blog:post-update' post.slug post.pk %}">Update</a>
                            </div>
                            <div className="post-delete">
                                <a href="{% url 'blog:post-delete' post.slug post.pk %}">Delete</a>
                            </div>
                            {/* {% endif %} */}
                        </div>
                        <div className="main-post-headline">
                            {/* <h2>{{ post.title }}</h2> */}
                        </div>
                        <div className="main-post-tags">
                            {/* {% for tag in post.tags.all %} */}
                                {/* <button><span id="tag-color"></span>{{ tag }}</button> */}
                            {/* {% endfor %} */}
                        </div>
                        <div className="post-main-detail ck-content">
                            {/* {{ post.content | safe }} */}
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
                        <p className="pop-like kat">Like this article</p>
                    </div>
                    <div className="social-share">
                        <i className="ri-message-3-line share-comment pop"></i>
                        <div className="comment-count"></div>
                        <p className="pop-comment kat">Write a comment</p>
                    </div>
                    <div className="social-share">
                        <i className="ri-bookmark-line share-bookmark pop"></i>
                        <p className="pop-bookmark kat">Add Bookmark</p>
                    </div>
                    <div className="social-share">
                        <i className="ri-share-line share-share pop"></i>
                        <p className="pop-share kat">Share this article</p>
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
                            <a href="#" className="permalink">
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

    </>
  )
}

export default PostDetail;