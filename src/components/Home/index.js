import {Component} from 'react'
import {Link} from 'react-router-dom'

import MenuContext from '../../context/MenuContext'

import Header from '../Header'
import TopRatedBooks from '../TopRatedBooks'

import './index.css'
import Footer from '../Footer'

class Home extends Component {
  state: {}

  renderTopSection = () => (
    <div className="home-top-section">
      <h1 className="home-top-section-heading">
        Find Your Next Favorite Books?
      </h1>
      <p className="home-top-section-desc">
        You are in the right place. Tell us what titles or genres you have
        enjoyed in the past, and we will give you surprisingly insightful
        recommendations.
      </p>
      <Link className="find-book-link-button" to="/shelf">
        <button className="find-books-button" type="button">
          Find Books
        </button>
      </Link>
    </div>
  )

  renderHomeContent = () => (
    <div className="home-container">
      {this.renderTopSection()}
      <TopRatedBooks />
      <Footer />
    </div>
  )

  render() {
    return (
      <MenuContext.Consumer>
        {value => {
          const {showMenu} = value

          return (
            <>
              <Header />
              {showMenu ? '' : this.renderHomeContent()}
            </>
          )
        }}
      </MenuContext.Consumer>
    )
  }
}

export default Home
