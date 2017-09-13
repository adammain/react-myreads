import React, { Component } from "react"
import PropTypes from "prop-types"
import { Route, Link } from "react-router-dom"
import * as _ from "lodash"
import * as BooksAPI from "./BooksAPI"
import * as helper from "./util/helpers"
import Book from "./Book"

class BookShelf extends Component {
  static propTypes = {
    shelf: PropTypes.string.isRequired,
    onSelectShelf: PropTypes.func.isRequired,
    books: PropTypes.array,
    shelfBooks: PropTypes.array
  }

  renderBook() {
    return (
      this.props.books.map((book, index) => (
        <li key={ index }>
          <Book book={ book } onSelectShelf={ this.props.onSelectShelf } />
        </li>
      ))
    )
  }

  render() {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">
          { helper.toTitleCase(this.props.shelf) }
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
