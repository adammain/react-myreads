import React from "react"
import { Route } from "react-router-dom"
import "react-select/dist/react-select.css"
import * as _ from "lodash"
import NotificationSystem from "react-notification-system"
import * as BooksAPI from "./BooksAPI"
import * as helper from "./util/helpers"
import "./App.css"
import Library from "./Library"
import Search from "./Search"

// TODO: Add notifications - COMPLETE
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

  _notificationSystem = null

  _addNotification = (message) => {
    this._notificationSystem.addNotification({
      message: message,
      level: 'success',
      position: 'tc'
    });
  }

  componentDidMount() {
    this._notificationSystem = this.refs.notificationSystem;

    BooksAPI.getAll().then((books) => {
      this.setState({ books })
      this.setState({ shelves: this.getBookShelves(this.state.books) })
    })
  }

  // Initializes books to approproate shelf (allows for dynamic shelf naming)
  getBookShelves(books) {
    let shelves = {}

    // Hardcode project required shelves then search for unique shelf names
    let shelfTitles = ["currentlyReading", "wantToRead", "read"]
    let newShelfTitles = [...new Set(books.map(book => book.shelf))]
    newShelfTitles.map((title) => (
      shelfTitles.indexOf(title) === -1 ? shelfTitles.push(title) : console.log("This shelf already exists")
    ))

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
    const bookIndex = this.state.books.findIndex((b => b.id === book.id));

    // Make a deep copy of book, update shelf definition (for state immutability)
    let _bookCopy = _.merge({}, book)
    _bookCopy.shelf = shelf

    // Update DB
    BooksAPI.update(_bookCopy, shelf).then(res => {
      // Update state
      if (bookIndex !== -1) {
        this.setState(state => ({
          books: state.books.map((b) => (
            b.id === book.id ? _bookCopy : b
          ))
        }))
        // Notification for changing book's shelf or removing from library
        if (shelf === "none")
          this._addNotification(`Removed ${book.title} from library.`)
        else
          this._addNotification(`Successfully added book to "${helper.toTitleCase(shelf)}".`)
      }
      else {
        this.setState(state => ({
          books: state.books.concat([ _bookCopy ])
        }))
        // Notification for adding book to library
        this._addNotification(`Successfully added ${book.title} to your libraries "${helper.toTitleCase(shelf)}" shelf.`)
      }
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
        <NotificationSystem ref="notificationSystem" />
      </div>
    )
  }
}

export default BooksApp
