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
    searchedBooks : [],
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

  handleChangeShelf = (bookId, e) => {
    let allBooks = this.state.books;
    const book = allBooks.filter(oneBook => oneBook.id === bookId)[0];

    BooksAPI.update(book, e.target.value).then(response => {
      this.setState({
        books: allBooks
      });
    });
    console.log(e.target.value);
  }


  searchResults = (query) => {
   this.setState({
     queryText: query
   })
   if(query !== "") {
     BooksAPI.search(query, 20).then(data => {
       if (!data || data.error) {
         this.setState({
             searchedBooks: []
         })
         return
       } else {
         this.setState({
             searchedBooks: data
         })

         return
       }
     })
   } else {
     return this.state.searchedBooks
   }

 }

  render() {

    return (
    	<div className="app">
         	<Route exact path="/" render={() => <BookShelfList shelfBooks={this.state.books} handleBooks={this.handleChangeShelf} />} />
          <Route exact path="/search" render={() => <Search onChangeQuery={this.searchResults} shelfBooks={this.state.searchedBooks} handleBooks={this.handleChangeShelf}/>} />
          <SearchButton />
      </div>
    )
  }
}

export default App
