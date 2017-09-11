import React from "react"
import { BrowserRouter, Route, Link } from "react-router-dom"
import * as BooksAPI from "./BooksAPI"
import "./App.css"
import MainBookshelf from "./MainBookshelf"
import SearchNewBook from "./SearchNewBook"

class BooksApp extends React.Component {
  state = {

  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <MainBookshelf />
        )}/>
        <Route path="/search-new" render={() => (
          <SearchNewBook />
        )}/>
      </div>
    )
  }
}

export default BooksApp
