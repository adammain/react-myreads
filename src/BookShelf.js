import React, { Component } from "react"
import PropTypes from "prop-types"
import { Route, Link } from "react-router-dom"
import Book from "./Book"

class BookShelf extends Component {
  static propTypes = {
    shelf: PropTypes.string.isRequired,
    books: PropTypes.array
  }

  getShelfTitle(shelf) {
    if (shelf === "currentlyReading")
      return "Currently Reading"
    else if (shelf === "wantToRead")
      return "Want to Read"
    else if (shelf === "read")
      return "Read"
    else
      return "Unknown"
  }

  renderBook() {
    return (
      this.props.books.map((book, index) => (
        <li key={index}>
          <Book book={book} />
        </li>
      ))
    )
  }

  render() {
    // console.log(this.props.books, this.props.shelf)
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">
          { this.getShelfTitle(this.props.shelf) }
      </h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            { this.renderBook() }
          </ol>
        </div>
      </div>
    )
  }
}

export default BookShelf;
