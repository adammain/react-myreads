import React from "react"
import { Route } from "react-router-dom"
import * as BooksAPI from "./BooksAPI"
import "./App.css"
import Library from "./Library"
import SearchNewBook from "./SearchNewBook"

class BooksApp extends React.Component {
  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <Library
            books={ this.state.books }
          />
        )}/>
        <Route path="/search-new" render={() => (
          <SearchNewBook />
        )}/>
      </div>
    )
  }
}

export default BooksApp
