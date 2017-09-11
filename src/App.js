import React from "react"
import { Route } from "react-router-dom"
import * as BooksAPI from "./BooksAPI"
import "./App.css"
import Library from "./Library"
import SearchNewBook from "./SearchNewBook"

class BooksApp extends React.Component {
  state = {

  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <Library />
        )}/>
        <Route path="/search-new" render={() => (
          <SearchNewBook />
        )}/>
      </div>
    )
  }
}

export default BooksApp
