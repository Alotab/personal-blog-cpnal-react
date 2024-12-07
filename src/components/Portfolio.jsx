import React, { useEffect } from 'react'
import image from "../assets/images/dev.JPG"
import { FaGithub } from "react-icons/fa6";

import { FaTwitter } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import scrollreveal from 'scrollreveal';

// scrollreveal

const Portfolio = () => {
    useEffect(() => {
        // Make sure ScrollReveal is available after script load
        if (typeof scrollreveal !== 'undefined') {
            const sr = scrollreveal({
            origin: 'top',
            distance: '60px',
            duration: 2500,
            delay: 400,
            });

            // Apply the reveal animations to various elements
            sr.reveal('.home__data, .footer__container, .footer__group');
            sr.reveal('.portfolio-container, .portfolio-card', { delay: 700, origin: 'bottom' });
            sr.reveal('.portfolio-container, .portfolio-card', { interval: 100 });
            sr.reveal('.my-profile-introduction', { origin: 'left' });
            sr.reveal('.my-profile-image', { origin: 'right' });
        }
    }, []);



    return (
        <div className='portfolio-title'>
            <h2>Portfolio</h2>
            <div className="my-profile-snippet load-hidden">
                <div className="my-profile-introduction">
                    <h1>Hi, I'm Albert Frimpong</h1>
                    <p>
                        I'm a freelance software developer with a passion for learning and taking on new challenges. I have experience working with a variety of technologies, including Python, JavaScript, and React. I'm also proficient in a variety of other areas, such as data science, machine learning, and artificial intelligence.
                    </p>
                    <p>
                        I'm looking for freelance opportunities where I can use my skills and knowledge to help businesses solve their problems. I'm a highly motivated and results-oriented individual, and I'm confident that I can deliver high-quality work on time and within the customer's specifications.
                    </p>
                    <p>
                        If you're looking for a talented and experienced freelance software developer, I would be honored to discuss your project with you. 
                        Please feel free to contact me.
                    </p>

                    <div className="my-social-link-btn">
                        <a href="https://twitter.com/alazkaBoi " target="_blank">
                            <FaTwitter />
                        </a>
                        <a href="https://github.com/Alotab " target="_blank">
                            <FaGithub />
                        </a>
                        <a href="https://www.linkedin.com/in/alotab/ " target="_blank">
                            <FaLinkedin />
                        </a>
                        {/* <a href="https://twitter.com/alazkaBoi " target="_blank">< className="ri-twitter-fill"></i></a> */}
                        {/* <a href="https://github.com/Alotab" target="_blank">< className="ri-github-fill"></i></a> */}
                        {/* <a href="https://www.linkedin.com/in/alotab/" target="_blank">< class="ri-linkedin-box-fill"></i></a> */}
                    </div>
                </div>
        

                <div className="my-profile-image">
                    <img src={image}  alt="portfolio image" />
                </div>
            </div>
        </div>
    )
}

export default Portfolio;