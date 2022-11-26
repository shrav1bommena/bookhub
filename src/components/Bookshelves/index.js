import {Link} from 'react-router-dom'
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {BsSearch, BsFillStarFill} from 'react-icons/bs'

import Header from '../Header'
import Footer from '../Footer'
import MenuContext from '../../context/MenuContext'

import './index.css'
import BookshelvesSidebar from '../BookshelvesSidebar'

const bookshelvesList = [
  {
    id: '22526c8e-680e-4419-a041-b05cc239ece4',
    value: 'ALL',
    label: 'All',
  },
  {
    id: '37e09397-fab2-46f4-9b9a-66b2324b2e22',
    value: 'READ',
    label: 'Read',
  },
  {
    id: '2ab42512-3d05-4fba-8191-5122175b154e',
    value: 'CURRENTLY_READING',
    label: 'Currently Reading',
  },
  {
    id: '361d5fd4-9ea1-4e0c-bd47-da2682a5b7c8',
    value: 'WANT_TO_READ',
    label: 'Want to Read',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Bookshelves extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    bookshelfName: 'ALL',
    searchText: '',
    booksList: [],
  }

  componentDidMount() {
    this.getBookshelvesData()
  }

  getBookshelvesData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {bookshelfName, searchText} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/book-hub/books?shelf=${bookshelfName}&search=${searchText}`
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
        rating: eachBook.rating,
        readStatus: eachBook.read_status,
        title: eachBook.title,
      }))
      this.setState({
        booksList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onChangeSearchInput = event => {
    this.setState({searchText: event.target.value})
  }

  onPressEnter = event => {
    if (event.key === 'Enter') {
      this.getBookshelvesData()
    }
  }

  searchBooks = () => {
    this.getBookshelvesData()
  }

  getBooksByStatus = id => {
    const bookByStatus = bookshelvesList.find(eachShelf => eachShelf.id === id)
    this.setState({bookshelfName: bookByStatus.value}, this.getBookshelvesData)
  }

  renderBookshelvesLoadingView = () => (
    <div className="bookshelves-loader-container" testid="loader">
      <Loader type="TailSpin" color="#0284C7" height={50} width={50} />
    </div>
  )

  renderBookshelvesFailureView = () => (
    <div className="bookshelves-failure-container">
      <img
        className="top-rated-failure-img"
        src="https://res.cloudinary.com/dzduqsp2x/image/upload/v1667226932/Group_7522_o5ehi7.png"
        alt="failure view"
      />
      <p className="top-rated-failure-desc">
        Something went wrong, Please try again.
      </p>
      <button
        onClick={this.getBookshelvesData}
        className="top-rated-failure-try-again"
        type="button"
      >
        Try Again
      </button>
    </div>
  )

  renderMobileViewReadStatusButtons = () => {
    const {bookshelfName} = this.state

    return (
      <div className="bookshelves-book-reading-status-mobile-view-div">
        <h1 className="bookshelves-book-reading-status-mobile-view-heading">
          Bookshelves
        </h1>
        <ul className="bookshelves-book-reading-status-mobile-view-list">
          {bookshelvesList.map(eachShelf => {
            const activeBookStatusClassName =
              bookshelfName === eachShelf.value
                ? 'bookshelves-book-reading-status-mobile-view-active-button'
                : ''

            const onChangeBookStatus = () => {
              this.getBooksByStatus(eachShelf.id)
            }
            return (
              <li key={eachShelf.id}>
                <button
                  className={`bookshelves-book-reading-status-mobile-view-button ${activeBookStatusClassName}`}
                  onClick={onChangeBookStatus}
                  type="button"
                >
                  {eachShelf.label}
                </button>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }

  renderBooksListData = () => {
    const {booksList, searchText} = this.state
    const lenBookList = booksList.length

    return lenBookList > 0 ? (
      <>
        <ul className="books-list-container">
          {booksList.map(eachBook => (
            <li className="book-container" key={eachBook.id}>
              <Link
                className="book-link-container"
                to={`/books/${eachBook.id}`}
              >
                <img
                  className="book-cover-pic"
                  src={eachBook.coverPic}
                  alt={eachBook.title}
                />
                <div>
                  <h1 className="book-title">{eachBook.title}</h1>
                  <p className="book-author">{eachBook.authorName}</p>
                  <div className="book-rating-container">
                    <p className="book-rating">Avg Rating </p>
                    <BsFillStarFill className="book-star" />
                    <p className="book-rating-span">{eachBook.rating}</p>
                  </div>
                  <p className="book-reading-status">
                    Status:{' '}
                    <span className="book-reading-status-span">
                      {eachBook.readStatus}
                    </span>
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
        <Footer />
      </>
    ) : (
      <div className="bookshelves-results-not-found-container">
        <img
          src="https://res.cloudinary.com/dzduqsp2x/image/upload/v1667393588/Group_cxxxvu.png"
          alt="no books"
          className="bookshelves-results-not-found-img"
        />
        <p className="bookshelves-results-not-found-text">
          Your search for {searchText} did not find any matches.
        </p>
      </div>
    )
  }

  renderBookListByApiStatus = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderBooksListData()
      case apiStatusConstants.failure:
        return this.renderBookshelvesFailureView()
      case apiStatusConstants.inProgress:
        return this.renderBookshelvesLoadingView()

      default:
        return null
    }
  }

  renderBooksList = () => {
    const {bookshelfName} = this.state
    const currentBookShelf = bookshelvesList.find(
      eachShelf => eachShelf.value === bookshelfName,
    )
    const currentBookshelfName = currentBookShelf.label

    return (
      <div className="bookshelves-content-container">
        <div className="booksList-top-section">
          <h1 className="booksList-top-section-heading">
            {currentBookshelfName} Books
          </h1>
          <div className="search-box-container">
            <input
              onChange={this.onChangeSearchInput}
              className="search-box-input"
              type="search"
              placeholder="Search"
              onKeyDown={this.onPressEnter}
            />
            <button
              testid="searchButton"
              onClick={this.searchBooks}
              className="search-box-button"
              type="button"
            >
              <BsSearch />
            </button>
          </div>
        </div>
        {this.renderMobileViewReadStatusButtons()}
        {this.renderBookListByApiStatus()}
      </div>
    )
  }

  render() {
    const {bookshelfName} = this.state

    return (
      <MenuContext.Consumer>
        {value => {
          const {showMenu} = value

          return (
            <>
              <Header />
              {showMenu ? (
                ''
              ) : (
                <div className="bookshelves-container">
                  <div className="bookshelves-inner-container">
                    <BookshelvesSidebar
                      bookshelfName={bookshelfName}
                      getBooksByStatus={this.getBooksByStatus}
                    />
                    {this.renderBooksList()}
                  </div>
                </div>
              )}
            </>
          )
        }}
      </MenuContext.Consumer>
    )
  }
}

export default Bookshelves
