
import React from 'react'


const Sidebar = () => {
  return (
    <div className='left-colume'>
        <div className="tags">
            <h3 className="tag-headling">Popular Tags</h3>
            <div className="sidebar-nav">
                {/* {% for tag in tags %} */}
                {/* <div className="sidebar-nav-element">#{{ tag }}</div> */}
                {/* {% endfor %} */}
            </div>
        </div>
    </div>
  )
}

export default Sidebar