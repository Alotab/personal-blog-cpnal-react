import { Link } from 'react-router-dom'
import notFound from '../assets/images/bg.jpg'

const PageNotFound = () => {
  return (
    <article className='page-not-found'>
        <div className="page-container">
          <div class="header-404">
            <img src={notFound} />
           
          </div>
          <div className="header-message">
            <h1>404</h1>
            <h3>Page Not Found!</h3>
            <p>
            We're sorry, the page you requested could not be found. Please go back
            to the homepage!
          </p>
          </div>
        </div>

        <div className="not-found-home">
          <Link to="/">Visit Homepage</Link>
        </div>
    </article>
  )
}

export default PageNotFound;