import { Link } from 'react-router-dom';

const NotAuthorized = () => {
  return (
    <div style={{ marginTop: '120px'}}>
        <h2>403 - Not Authorized</h2>
        <p>You do not have permission to access this page.</p>
        <Link to="/">Go back to the homepage</Link>
    </div>
  )
}

export default NotAuthorized;