import {withRouter, Link} from 'react-router-dom'
import Cookies from 'js-cookie'

import MenuContext from '../../context/MenuContext'

import './index.css'

// const tabsList = [
//   {id: 'HOME', tabText: 'Home'},
//   {id: 'BOOKSHELVES', tabText: 'Bookshelves'},
// ]

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <MenuContext.Consumer>
      {value => {
        const {showMenu, handleShowMenu} = value

        return (
          <>
            <nav className="nav-header">
              <div className="nav-content">
                <Link to="/">
                  <img
                    className="website-logo"
                    src="https://res.cloudinary.com/dzduqsp2x/image/upload/v1666082692/Group_7731_h5ogg3.png"
                    alt="website logo"
                  />
                </Link>
                <button
                  onClick={handleShowMenu}
                  className="hamburger-button"
                  type="button"
                >
                  <img
                    className="hamburger-menu"
                    src="https://res.cloudinary.com/dzduqsp2x/image/upload/v1667109674/icon_nxedhl.svg"
                    alt="hamburger icon"
                  />
                </button>
                <ul className="tabs-list-container">
                  <Link className="link-tab-items" to="/">
                    <li>
                      <p className="tab-item ">Home</p>
                    </li>
                  </Link>
                  <Link className="link-tab-items" to="/shelf">
                    <li>
                      <p className="tab-item ">Bookshelves</p>
                    </li>
                  </Link>
                  <li>
                    <button
                      onClick={onClickLogout}
                      className="logout-button"
                      type="button"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            </nav>
            {showMenu && (
              <div className="mobile-menu-options">
                <ul className="tabs-list-mobile-container">
                  <Link
                    onClick={handleShowMenu}
                    className="link-tab-items"
                    to="/"
                  >
                    <li>
                      <p className="tab-item ">Home</p>
                    </li>
                  </Link>
                  <Link
                    onClick={handleShowMenu}
                    className="link-tab-items"
                    to="/shelf"
                  >
                    <li>
                      <p className="tab-item ">Bookshelves</p>
                    </li>
                  </Link>
                  <li onClick={handleShowMenu}>
                    <button
                      onClick={onClickLogout}
                      className="logout-button"
                      type="button"
                    >
                      Logout
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={handleShowMenu}
                      className="hamburger-button"
                      type="button"
                    >
                      <img
                        src="https://res.cloudinary.com/dzduqsp2x/image/upload/v1667120481/Shape_z6gvf6.svg"
                        alt="close-icon"
                      />
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </>
        )
      }}
    </MenuContext.Consumer>
  )
}

export default withRouter(Header)
