import React from 'react'
import { Link } from 'react-router-dom'



const Footer = () => {
  return (
    <>
        <footer>
            <div className="website-slogan">
                <p className="footer-website-name">DevWithCode</p>
                <p>A community that refines your programming journey.</p>
            </div>
            <ul className="footer-nav">
                <li className="footer-nav-link"><Link to={"/"}>Home</Link></li>
                <li><Link to={"/portfolio"}>Portfolio</Link></li>
                <li><Link to={"/portfolio"}>Contact</Link></li>
            </ul>
            <div className="signarture">
                <p>@2024</p>
                <i className="ri-heart-fill footer-heart-icon"></i>
            </div>
        </footer>
    </>
  )
}

export default Footer