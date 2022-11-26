import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsFillStarFill} from 'react-icons/bs'

import Header from '../Header'
import Footer from '../Footer'
import MenuContext from '../../context/MenuContext'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class BookDetails extends Component {
  state = {bookDetails: {}, apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getBookDetails()
  }

  getBookDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params

    const jwtToken = Cookies.get('jwt_token')

    const apiUrl = `https://apis.ccbp.in/book-hub/books/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(apiUrl, options)
    const data = await response.json()
    const bookDetails = data.book_details

    if (response.ok) {
      const updatedData = {
        aboutAuthor: bookDetails.about_author,
        aboutBook: bookDetails.about_book,
        authorName: bookDetails.author_name,
        coverPic: bookDetails.cover_pic,
        id: bookDetails.id,
        rating: bookDetails.rating,
        readStatus: bookDetails.read_status,
        title: bookDetails.title,
      }
      this.setState({
        bookDetails: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderBookDetailsData = () => {
    const {bookDetails} = this.state

    return (
      <div className="book-details-container">
        <div className="book-details-inner-container">
          <div className="book-details-book-container">
            <img
              className="book-details-cover-pic"
              src={bookDetails.coverPic}
              alt={bookDetails.title}
            />
            <div>
              <h1 className="book-details-title">{bookDetails.title}</h1>
              <p className="book-details-author">{bookDetails.authorName}</p>
              <div className="book-details-rating-container">
                <p className="book-details-rating">Avg Rating </p>{' '}
                <BsFillStarFill className="book-details-star" />{' '}
                <p className="book-details-rating-span">{bookDetails.rating}</p>
              </div>
              <p className="book-details-reading-status">
                Status:{' '}
                <span className="book-details-reading-status-span">
                  {bookDetails.readStatus}
                </span>
              </p>
            </div>
          </div>
          <div className="book-details-about-section-container">
            <h1 className="book-details-about-heading">About Author</h1>
            <p className="book-details-about-desc">{bookDetails.aboutAuthor}</p>
          </div>
          <div>
            <h1 className="book-details-about-heading">About Book</h1>
            <p className="book-details-about-desc">{bookDetails.aboutBook}</p>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  renderBookDetailsLoadingView = () => (
    <div className="bookDetails-loader-container" testid="loader">
      <Loader type="TailSpin" color="#0284C7" height={50} width={50} />
    </div>
  )

  renderBookDetailsFailureView = () => (
    <div className="book-details-failure-container">
      <img
        className="top-rated-failure-img"
        src="https://res.cloudinary.com/dzduqsp2x/image/upload/v1667226932/Group_7522_o5ehi7.png"
        alt="failure view"
      />
      <p className="top-rated-failure-desc">
        Something went wrong, Please try again.
      </p>
      <button
        onClick={this.getBookDetails}
        className="top-rated-failure-try-again"
        type="button"
      >
        Try Again
      </button>
    </div>
  )

  renderBookDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderBookDetailsData()
      case apiStatusConstants.failure:
        return this.renderBookDetailsFailureView()
      case apiStatusConstants.inProgress:
        return this.renderBookDetailsLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <MenuContext.Consumer>
        {value => {
          const {showMenu} = value

          return (
            <>
              <Header />
              {showMenu ? '' : this.renderBookDetails()}
            </>
          )
        }}
      </MenuContext.Consumer>
    )
  }
}

export default BookDetails
