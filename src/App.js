import React from "react"
import { Route } from "react-router-dom"
import "react-select/dist/react-select.css"
import * as _ from "lodash"
import * as BooksAPI from "./BooksAPI"
import "./App.css"
import Library from "./Library"
import SearchNewBook from "./SearchNewBook"

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

  // Initializes books to approproate shelf - allows for dynamic shelf naming
  getBookShelves(books) {
    // Get all unique shelf titles from list of books
    let shelfTitles = [...new Set(books.map(book => book.shelf))];
    let shelves = {}
    // Create shelves object. Key: ShelfTitle, Value: Array(Books)
    shelfTitles.forEach((shelf) => {
      let booksOnShelf = books.filter((book) => book.shelf === shelf)
      shelves[shelf] = booksOnShelf
    })

    return shelves
  }

  // Update a book's shelf
  updateShelf = (book, shelf) => {
    // Find Index of book to be updated
    const bookIndex = this.state.books.findIndex((b => b.id == book.id));

    // Deep copy book to be changed (for state immutability)
    let _bookCopy = _.merge({}, book)

    // Update shelf of book
    _bookCopy.shelf = shelf

    // Update DB
    BooksAPI.update(book, shelf).then(ret => {
      // Update state
      this.setState(state => ({
        books: state.books.map((b) => (
          b.id === book.id ? _bookCopy : b
        ))
      }))

      // Update book shelf titles
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
            onChangeShelf={ this.updateShelf }
          />
        )}/>
        <Route path="/search-new" render={() => (
          <SearchNewBook />
        )}/>
      </div>
    )
  }
}

export default BooksApp
