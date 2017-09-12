import React, { Component } from "react"
import PropTypes from "prop-types"
import { Route, Link } from "react-router-dom"
import * as _ from "lodash"
import * as BooksAPI from "./BooksAPI"
import Book from "./Book"

class BookShelf extends Component {
  static propTypes = {
    shelf: PropTypes.string.isRequired,
    books: PropTypes.array,
    shelfBooks: PropTypes.array
  }

  toTitleCase(str) {
    return _.startCase(str)
  }

  renderBook() {
    return (
      this.props.books.map((book, index) => (
        <li key={ index }>
          <Book book={ book } onChangeShelf={ this.props.onChangeShelf } />
        </li>
      ))
    )
  }

  render() {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">
          { this.toTitleCase(this.props.shelf) }
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
