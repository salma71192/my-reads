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
    allBooks: [],
    queryText: ''
  }

// get all books from the BooksAPI
componentDidMount() {
	BooksAPI.getAll().then(data => {
    	this.setState({
    		books: data,
        allBooks: data
  		});
      console.log(data);
    });
  }


 handleShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then(response => {
  		this.getBooks();
  	});
  }

getBooks = (e) => {
	BooksAPI.getAll().then(data => {
    	this.setState({
    		books: data,
        allBooks: data
  		});
    });
  }

  updateQuery = (query) => {
    this.setState({ queryText: query })
  }


  render() {
    let filterBooks = [],
        currentBooks = this.state.books;

    filterBooks = currentBooks.filter((book) => {
      if(book.title.toLowerCase().indexOf(this.state.queryText) !== -1) {
        return filterBooks.push(book)
      }
    });


    return (
    	<div className="app">
         	<Route exact path="/" render={() => <BookShelfList shelfBooks={this.state.books} />} />
          <Route exact path="/search" render={() => <Search shelfBooks={filterBooks} currentBooks={this.getBooks} onChangeQuery={this.updateQuery}  />} />
          <SearchButton />
      </div>
    )
  }
}

export default App
