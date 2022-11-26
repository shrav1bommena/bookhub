import {Component} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import Slider from 'react-slick'

import '../../../node_modules/slick-carousel/slick/slick.css'
import '../../../node_modules/slick-carousel/slick/slick-theme.css'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class TopRatedBooks extends Component {
  state = {apiStatus: apiStatusConstants.initial, topRatedBooksList: []}

  componentDidMount() {
    this.getTopRatedBooksData()
  }

  getTopRatedBooksData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const apiUrl = 'https://apis.ccbp.in/book-hub/top-rated-books'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok) {
      const updatedData = data.books.map(eachBook => ({
        authorName: eachBook.author_name,
        coverPic: eachBook.cover_pic,
        id: eachBook.id,
        title: eachBook.title,
      }))
      this.setState({
        apiStatus: apiStatusConstants.success,
        topRatedBooksList: updatedData,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderTopRatedBooks = () => {
    const {topRatedBooksList} = this.state

    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 4,
      initialSlide: 0,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 4,
            infinite: true,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            initialSlide: 0,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
          },
        },
      ],
    }

    return (
      <ul className="slick-container">
        <Slider {...settings}>
          {topRatedBooksList.map(eachBook => (
            <li className="top-rated-book-container" key={eachBook.id}>
              <Link
                className="top-rated-book-link-container"
                to={`/books/${eachBook.id}`}
              >
                <div className="top-rated-book-cover-pic-container">
                  <img
                    className="top-rated-book-cover-pic"
                    src={eachBook.coverPic}
                    alt={eachBook.title}
                  />
                </div>
                <h1 className="top-rated-book-title">{eachBook.title}</h1>
                <p className="top-rated-book-author">{eachBook.authorName}</p>
              </Link>
            </li>
          ))}
        </Slider>
      </ul>
    )
  }

  renderTopRatedBooksLoadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#0284C7" height={50} width={50} />
    </div>
  )

  renderTopRatedBooksFailureView = () => (
    <div className="top-rated-failure-container">
      <img
        className="top-rated-failure-img"
        src="https://res.cloudinary.com/dzduqsp2x/image/upload/v1667226932/Group_7522_o5ehi7.png"
        alt="failure view"
      />
      <p className="top-rated-failure-desc">
        Something went wrong, Please try again.
      </p>
      <button
        onClick={this.getTopRatedBooksData}
        className="top-rated-failure-try-again"
        type="button"
      >
        Try Again
      </button>
    </div>
  )

  renderTopRatedBooksData = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderTopRatedBooks()
      case apiStatusConstants.inProgress:
        return this.renderTopRatedBooksLoadingView()
      case apiStatusConstants.failure:
        return this.renderTopRatedBooksFailureView()

      default:
        return null
    }
  }

  render() {
    return (
      <div className="top-rated-books-container">
        <div className="top-rated-book-top-section">
          <h1 className="top-rated-heading">Top Rated Books</h1>
          <Link className="find-book-link-desktop-button" to="/shelf">
            <button
              className="top-rated-book-top-section-find-books-button"
              type="button"
            >
              Find Books
            </button>
          </Link>
        </div>
        {this.renderTopRatedBooksData()}
      </div>
    )
  }
}

export default TopRatedBooks
