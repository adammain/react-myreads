import React, { Component } from "react"
import PropTypes from 'prop-types'
import { Route, Link } from "react-router-dom"
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

  // TODO: ABILITY TO CHANGE SHELF NAMES
  // BUG: SHELF NAME DOESN'T APPEAR AFTER UPDATE IF IT WASN'T THERE ON PAGE LOAD

  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
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
