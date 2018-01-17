import React from 'react'
import { Route } from 'react-router-dom'

import * as BooksAPI from './BooksAPI'
import BookShelfList from './BookShelfList'
import Search from './Search'
import SearchButton from './SearchButton'
import './app.css'


class App extends React.Component {
  state = {
    books: []
  }

// get all books from the BooksAPI
componentDidMount() {
	BooksAPI.getAll().then(data => {
    	this.setState({
    		books: data
  		});
    });
  }


 handleShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then(response => {
  		this.getBooks();
  	});
  }

  getBooks() {
	BooksAPI.getAll().then(data => {
    	this.setState({
    		books: data
  		});
    });
  }

  render() {
    return (
    	<div className="app">
         	<Route exact path="/" render={() => <BookShelfList shelfBooks={this.state.books} />} />
            <Route exact path="/search" render={() => <Search onChangeShelf={this.handleShelf}  />} />
            <SearchButton />
      </div>
    )
  }
}

export default App
