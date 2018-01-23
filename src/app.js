import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import BookShelfList from './BookShelfList'
import Search from './Search'
import SearchButton from './SearchButton'
import './app.css'


class App extends React.Component {
  state = {
    books: [],
    searchBooks: [],
    queryText: "",
    shelf: "none"
  }

// get all books from the BooksAPI
componentDidMount() {
	BooksAPI.getAll().then(data => {
    	this.setState({
        books: data,
  		});
    });
  }

 // handle update shelves from shelf to shelf
  handleChangeShelf = (bookId, e) => {
    let allBooks = this.state.books
    const book = allBooks.filter(oneBook => oneBook.id === bookId)[0];
    book.shelf = e.target.value;
    BooksAPI.update(book, e.target.value).then(response => {
      this.setState({
        books: allBooks
      });
    });
  }

  // handle update shelves from search books
  handleSearchShelf = (bookId, e) => {
    let allBooks = this.state.searchBooks
    const book = allBooks.filter(oneBook => oneBook.id === bookId)[0];
    book.shelf = e.target.value;
    BooksAPI.update(book, e.target.value).then(response => {
      this.setState({
        searchBooks: allBooks
      });
    });
  }

  // Search function to look for books and move books to shelves
  searchResults = (query) => {
   this.setState({
     queryText: query
   })
   if(query !== "") {
     BooksAPI.search(query, 20).then(data => {
       if (!data || data.error) {
         this.setState({
           searchBooks: []
         })
         return
       } else {
         this.setState({
           searchBooks: data
         })
         return
       }
     })
   } else {
      this.state.books
      this.state.searchBooks
   }

 }

  render() {

    return (
    	<div className="app">
         	<Route exact path="/" render={() => <BookShelfList shelfBooks={this.state.books} handleBooks={this.handleChangeShelf} />} />
          <Route exact path="/search" render={() => <Search onChangeQuery={this.searchResults} shelfBooks={this.state.searchBooks} handleBooks={this.handleSearchShelf}/>} />
          <SearchButton />
      </div>
    )
  }
}

export default App
