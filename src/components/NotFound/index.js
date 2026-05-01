import {Link} from 'react-router-dom'
import './index.css'

const NotFound = () => (
  <div className="not-found">
    <div className="not-found-container">
      <img
        src="https://res.cloudinary.com/demo/image/upload/v1/samples/not-found"
        alt="page not found"
        className="not-found-image"
      />
      <h1 className="not-found-title">PAGE NOT FOUND</h1>
      <p className="not-found-message">
        we are sorry, the page you requested could not be found Please go back
        to the homepage.
      </p>
      <Link to="/">
        <button className="go-home-btn" type="button">
          Go to Home
        </button>
      </Link>
    </div>
  </div>
)

export default NotFound
