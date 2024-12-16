import { Link } from 'react-router-dom'


const PageNotFound = () => {
  return (
    <article style={{ marginTop: '120px'}}>
        <h1>Oops!</h1>
        <p>Page Not Found</p>
        <div className="flexGrow">
            <Link to="/">Visit Our Homepage</Link>
        </div>
    </article>
  )
}

export default PageNotFound;