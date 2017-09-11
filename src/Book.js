import React, { Component } from "react"
import PropTypes from 'prop-types'
import { Route, Link } from "react-router-dom"

class Book extends Component {
  static propTypes = {
    book: PropTypes.object.isRequired
  }

  renderAuthors(authors) {
    return (
      authors.map((author, index) => (
        <div key={ index } className="book-authors">{ author }</div>
      ))
    )
  }

  render() {
    const { book } = this.props
    // console.log(book)
    return (
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url(${ book.imageLinks.thumbnail })`
            }}>
          </div>
          <div className="book-shelf-changer">
            <select>
              <option value="none" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{ book.title }</div>
        { this.renderAuthors(book.authors) }
      </div>
    )
  }
}

export default Book;
