import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../assets/images/logo2.svg';
import React from 'react'
import { useApiContext } from '../context/ApiProvider';

// import { useDispatch, useSelector } from 'react-redux';
import { PropagateLoader } from 'react-spinners';


const Navbar = () => {
    const { userName, setUserName, setAccessToken, setRefreshToken } = useApiContext();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const logOut = () => {
        setUserName(null);
        setAccessToken('');
        setRefreshToken('');
        localStorage.clear();
        <PropagateLoader />
        navigate(from, { replace: true });
    };

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
                                
                                <li> <Link to={"/create-post"}>Write</Link></li>
                                <li> <Link to={"/portfolio"}>Portfolio</Link></li>
                                {userName 
                                ?  <li><Link to={"/"} onClick={logOut}>Logout</Link></li>
                                :
                                    <li><Link to={"login"}>Login</Link></li>
                                }
                                <li> <Link to={"/profile"}>Profile</Link></li>
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