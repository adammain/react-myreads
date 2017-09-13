import React from "react"
import { Route } from "react-router-dom"
import "react-select/dist/react-select.css"
import * as _ from "lodash"
import * as BooksAPI from "./BooksAPI"
import "./App.css"
import Library from "./Library"
import Search from "./Search"

// TODO: Add notifications
// TODO: Add ability to change shelf titles
// TODO: Add thumbs up/down ratings
// TODO: Add Netflix styling?
// TODO: Add Amazon Ratings (API)?
// TODO: Add links for book details?

class BooksApp extends React.Component {
  state = {
    books: [],
    shelves: {}
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
      this.setState({ shelves: this.getBookShelves(this.state.books) })
    })
  }

  // Initializes books to approproate shelf (allows for dynamic shelf naming)
  getBookShelves(books) {
    let shelves = {}

    // Get all unique shelf titles from list of books (for dynamic shelf names)
    let shelfTitles = [...new Set(books.map(book => book.shelf))];

    // Create shelves object. Key: ShelfTitle, Value: Array(Books)
    shelfTitles.forEach((shelf) => {
      let booksOnShelf = books.filter((book) => book.shelf === shelf)
      shelves[shelf] = booksOnShelf
    })

    return shelves
  }

  // Update a book's shelf definition
  updateShelf = (book, shelf) => {
    // Find Index of book to be updated
    const bookIndex = this.state.books.findIndex((b => b.id == book.id));

    // Make a deep copy of book to be updated (for state immutability)
    let _bookCopy = _.merge({}, book)

    // Update book copy shelf definition (ex. read -> wantToRead)
    _bookCopy.shelf = shelf

    // Update DB
    BooksAPI.update(_bookCopy, shelf).then(res => {
      // Update state

      if (bookIndex != -1)
        this.setState(state => ({
          books: state.books.map((b) => (
            b.id === book.id ? _bookCopy : b
          ))
        }))
      else
          this.setState(state => ({
            books: state.books.concat([ _bookCopy ])
          }))

      // Update book shelf titles
      // BUG: Page doesn't add unseen shelf titles without page reload
      this.getBookShelves(this.state.books)
    })
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <Library
            books={ this.state.books }
            shelves={ this.state.shelves }
            onSelectShelf={ this.updateShelf }
          />
        )}/>
        <Route path="/search-new" render={({ history }) => (
          <Search
            onSelectShelf={(book, shelf) => {
              this.updateShelf(book, shelf)
              history.push('/')
            }}
          />
        )}/>
      </div>
    )
  }
}

export default BooksApp
