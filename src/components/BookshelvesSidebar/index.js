import './index.css'

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

const BookshelvesSidebar = props => {
  const {bookshelfName, getBooksByStatus} = props
  return (
    <div className="bookshelves-sidebar">
      <div>
        <h1 className="sidebar-heading">Bookshelves</h1>
        <ul className="sidebar-list">
          {bookshelvesList.map(eachShelf => {
            const activeBookStatusClassName =
              bookshelfName === eachShelf.value
                ? 'sidebar-button-active'
                : 'sidebar-button'

            const onChangeBookStatus = () => {
              getBooksByStatus(eachShelf.id)
            }
            return (
              <li key={eachShelf.id}>
                <button
                  onClick={onChangeBookStatus}
                  className={activeBookStatusClassName}
                  type="button"
                >
                  {eachShelf.label}
                </button>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default BookshelvesSidebar
