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
    searchBooks: []
  }

  getAllBooks = (data) => {
    BooksAPI.getAll().then(data => {
      	this.setState({
          books: data,
    		});
      });
  }

  updateBook = (book, shelf, currentBooks) => {
    BooksAPI.update(book, shelf).then(response => {
      this.getAllBooks(currentBooks)
    });
  }

  // get all books from the BooksAPI
    componentDidMount() {
    	this.getAllBooks();
    }

 // handle update shelves from shelf to shelf
  handleChangeShelf = (bookId, shelfBooks, e) => {
    let allBooks = shelfBooks;
    const book = allBooks.filter(oneBook => oneBook.id === bookId)[0];
    book.shelf = e.target.value;
    this.updateBook(book, e.target.value, allBooks);
  }

  // Search function to look for books and move books to shelves
  searchResults = (query) => {
   if(query !== "") {
     BooksAPI.search(query, 10).then(data => {
         if(!data || data.error) {
           this.setState({
             searchBooks: []
           })
           return
         }
      // sync books shelves
       const adjustedBooks = data.map(searchResult => {
          this.state.books.forEach(book => {
            if (book.id === searchResult.id) searchResult.shelf = book.shelf
          })
          return searchResult
        })

        this.setState({ searchBooks: adjustedBooks })
      })
   } else if(query === "") {
       this.setState({
         searchBooks: []
       })
   }
 }

  render() {

    return (
    	<div className="app">
         	<Route exact path="/" render={() => <BookShelfList shelfBooks={this.state.books} handleBooks={this.handleChangeShelf} />} />
          <Route exact path="/search" render={() => <Search onChangeQuery={this.searchResults} shelfBooks={this.state.searchBooks} handleBooks={this.handleChangeShelf}/>} />
          <SearchButton/>
      </div>
    )
  }
}

export default App
