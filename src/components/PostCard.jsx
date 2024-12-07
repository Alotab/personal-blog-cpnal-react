import React from 'react'



const PostCard = () => {
  return (
    <div className='middle-colume-post' id='middle-colume-post'>
        <div className="post infinite-item ck-content">
            <div className="author-profile">
                <div className="author-image">
                    {/* <a href="{% url 'portfolio' %}"><img src="{{ post.author.profile_image.url }}" alt="author" /></a> */}
                    
                </div>
                <div className="post-author-details">
                    <a href="#"><p>John Max</p></a>
                    {/* {% with author=post.author %} */}
                        {/* <a href="{% url 'portfolio' %}"><p>{{ author.first_name}} {{ author.last_name}}</p></a> */}
                        {/* <p id="time-tag"  className="post-date">{{ post.publish |date:'M d' }} &middot; {{ post.get_readtime }} read</p> */}
                        
                    {/* {% endwith %} */}
                </div>
            </div>

            <div className="post-header">
                <a href="{{ post.get_absolute_url }}">
                    <h4>Blog Title</h4>
                    {/* <h4>{{ post.title | capfirst }}</h4> */}
                </a>
            </div>
            <div className="post-tags">
                {/* <a className="post-tag-chrome" href="#"><span></span>{{ tag }}</a> */}
            </div>
        </div>
    </div>
  )
}

export default PostCard