import React, { Component } from "react"
import PropTypes from 'prop-types'
import { Link } from "react-router-dom"
import Select from 'react-select';

class Book extends Component {
  static propTypes = {
    book: PropTypes.object.isRequired,
    onSelectShelf: PropTypes.func
  }

  handleChange = (e) => {
    let selectedShelf = e.target.value
    this.props.onSelectShelf(this.props.book, selectedShelf)
  }

  renderAuthors(authors) {
    if (authors)
      return (
        authors.map((author, index) => (
          <div key={ index } className="book-authors">{ author }</div>
        ))
      )
  }

  render() {
    const { book, onChangeShelf } = this.props
    let thumbnail = ""

    if (book.imageLinks)
      thumbnail = book.imageLinks.thumbnail
    else
      thumbnail = 'icons/no_cover_thumb.gif'

    return (
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url(${ thumbnail })`
            }}>
          </div>
          <div className="book-shelf-changer">
            <select value={ book.shelf ? book.shelf : "none" } onChange={ this.handleChange }>
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
