import { Link } from 'react-router-dom';

const NotAuthorized = () => {
  return (
    <div className='page-not-authorized'>
      <div className="unauthorized-container">
        <h2>403 - Not Authorized</h2>
        <p>You do not have permission to access this page.</p>
        <Link className='link-home' to="/">Go back to the homepage</Link>
      </div>
    </div>
  )
}

export default NotAuthorized;