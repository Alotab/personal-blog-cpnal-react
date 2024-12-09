import { Link } from 'react-router-dom';
import logo from '../assets/images/logo2.svg';
import React from 'react'


const Navbar = () => {
  return (
    <>
        <header>
            <div className="scroll-tracker"></div>
            <div className="nav-main">
                <div className="logo">
                    <div className="main-logo">
                        <Link to={"/"}><img src={logo} alt="logo" /></Link>
                            
                    </div>
                </div>
        
                <button className="mobile-nav-toggle" 
                    aria-controls="primary-navigation" aria-expanded="false">
                    <span className="sr-only">
                        <i className="ri-menu-line"></i>
                    </span> 
                </button>

                <button className="mobile-nav-toggle-close" aria-expanded="false">
                    <span className="sr-only">
                        <i className="ri-close-line"></i>
                    </span> 
                    {/* <!--- add menu there to help screen readers know is not just an icon but a menu button--> */}
                </button>


                {/* <!-- Navigation links --> */}
                <div className="nav-links-menu">
                    <div className="subheader" id="nav-menu">
                        <nav>
                            <ul id="primary-navigation" data-visible="false"  className="primary-navigation">
                                {/* {% if request.user.is_authenticated %} */}
                                <li> <Link to={"/create-post"}>Write</Link></li>
                                <li> <Link to={"/portfolio"}>Portfolio</Link></li>
                                <li> <Link to={"/"}>Signout</Link></li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </header>
    </>
  )
}

export default Navbar