import {Link} from 'react-router-dom'

import './index.css'

const NotFound = () => (
  <>
    <div className="not-found-main-container">
      <div className="not-found-container">
        <img
          className="not-found-image"
          src="https://res.cloudinary.com/dzduqsp2x/image/upload/v1667208818/Group_7484_vxrkqk.png"
          alt="not found"
        />
        <h1 className="not-found-heading">Page Not Found</h1>
        <p className="not-found-desc">
          we are sorry, the page you requested could not be found, Please go
          back to the homepage.
        </p>
        <Link to="/">
          <button className="not-found-button" type="button">
            Go Back to Home
          </button>
        </Link>
      </div>
    </div>
  </>
)

export default NotFound
