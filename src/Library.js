import React, { Component } from "react"
import PropTypes from 'prop-types'
import { Route, Link } from "react-router-dom"
import BookShelf from "./BookShelf"

class Library extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired
  }

  state = {
    shelves: [
      "currentlyReading",
      "wantToRead",
      "read"
    ]
  }

  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {this.state.shelves.map((shelf) => (
              <BookShelf
                key={shelf}
                shelf={shelf}
                books={this.props.books.filter((book) => book.shelf === shelf)}
              />
            ))
            }
          </div>
        </div>
        <div className="open-search">
          <Link to="/search-new">Add a book</Link>
        </div>
      </div>
    )
  }
}

export default Library;
