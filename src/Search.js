import React, { Component } from "react"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"
import * as BooksAPI from "./BooksAPI"

class Search extends Component {
  static propTypes = {
    books: PropTypes.array,
    onSelectBook: PropTypes.func
  }

  state = {
    query: "",
    results: []
  }

  updateQuery = (query) => {
    const maxResults = 20
    this.setState({ query: query })

    BooksAPI.search(query, maxResults).then((res) => {
      this.setState({ results: res })
    })
  }

  clearQuery = () => {
    this.setState({ query: "" })
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={ this.state.query }
              onChange={(e) => this.updateQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid"></ol>
        </div>
      </div>
    )
  }
}

export default Search;
