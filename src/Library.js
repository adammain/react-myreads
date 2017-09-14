import React, { Component } from "react"
import PropTypes from 'prop-types'
import { Route, Link } from "react-router-dom"
import Header from "./Header"
import BookShelf from "./BookShelf"

class Library extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    shelves: PropTypes.object.isRequired,
    onSelectShelf: PropTypes.func
  }

  renderBookShelf() {
    let shelves = this.props.shelves
    return (
      Object.keys(shelves).map((shelf, index) => (
        <BookShelf
          key={ index }
          books={ this.props.books.filter((book) => book.shelf === shelf) }
          shelf={ shelf }
          onSelectShelf={ this.props.onSelectShelf }
        />
      ))
    )
  }

  render() {
    return (
      <div className="list-books">
        <Header title="MyReads" />
        <div className="list-books-content">
          <div>
            {
              this.renderBookShelf()
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
