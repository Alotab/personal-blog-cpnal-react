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
                        <a href="{% url 'blog:home' %}">
                            <img src={logo} alt="logo" /></a>
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
                                <li><a href="{% url 'blog:create' %}" className="sign-in-link write-link" id="sign-in"><i className="ri-edit-line"></i>Write</a></li>

                                <li><a href="{% url 'portfolio' %}" className="portfolio-link">Portfolio</a></li>
                                <li><a href="{% url 'logout' %}" className="sign-in-link" id="sign-in">Signout</a></li>
                                
                                {/* {% else %} */}
                                {/* <!--<li className="active"><a href="{% url 'blog:home' %}" className="home-link">Home</a></li>--> */}
                                {/* <li><a href="{% url 'portfolio' %}" className="portfolio-link">Portfolio</a></li> */}
                                {/* <!--<li><a href="{% url 'login' %}" className="sign-in-link">Sign-In</a></li>--> */}
                                {/* <!-- <li><a href="{% url 'signup' %}" className="create-account-link">Create account</a></li> --> */}
                                {/* {% endif %} */}
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