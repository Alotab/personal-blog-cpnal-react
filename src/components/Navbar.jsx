import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../assets/images/logo2.svg';
import React, { useState } from 'react'
import { useApiContext } from '../context/ApiProvider';

// import { useDispatch, useSelector } from 'react-redux';
import { PropagateLoader } from 'react-spinners';

import Hamburger from 'hamburger-react'

const Navbar = () => {
    const { setAccessToken, setRefreshToken, setAuth, auth } = useApiContext();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    }

    

    const logOut = () => {
        setAuth({});
        // setUserName(null);
        setAccessToken('');
        setRefreshToken('');
        localStorage.clear();
        <PropagateLoader />
        navigate(from, { replace: true });
    };

  return (
    <>
        <header>
            <div className="nav-main">
                <div className="logo">
                    <div className="main-logo">
                        <Link to={"/"}><img src={logo} alt="logo" /></Link> 
                    </div>
                </div>
        
                {/* Menu bar Icon  */}
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
                        <div className="hamburger-menu">
                            <Hamburger 
                                toggled={isOpen} 
                                toggle={toggleMenu}
                                size={25}
                                className='hamburger-menu'
                            />
                        </div>
                        
                        <nav className={`primary-navigation ${isOpen ? 'open': ''}`} data-visible={isOpen ? 'true' : 'false'}>
                        
                            {/* className="primary-navigation" */}
                            <ul id="primary-navigation"> 
                                <li> <Link to={"/create-post"} className='nav-element'>Write</Link></li>
                                <li> <Link to={"/portfolio"} className='nav-element'>Portfolio</Link></li>
                                { auth.username 
                                ?  ( 
                                    <>
                                        <li><Link to={"/"} onClick={logOut} className='nav-element'>Logout</Link></li>
                                        <li> <Link to={"/profile"} className='nav-element'>Profile</Link></li>
                                    </>
                                    )
                                :
                                    (<li><Link to={"login"} className='nav-element'>Login</Link></li>)
                                }
                                
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