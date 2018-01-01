import React from 'react'
import Bookshelf from './Bookshelf.js'

import * as BooksAPI from "./BooksAPI";
import "./App.css";

class BookShelfList extends React.Component {
  handleChangeShelf = (bookId, e) => {
    let allBooks = this.props.shelfBooks;
    const book = allBooks.filter(oneBook => oneBook.id === bookId)[0];
    book.shelf = e.target.value;
    BooksAPI.update(book, e.target.value).then(response => {
      this.setState({
        books: allBooks
      });
    });
  };

  render() {
  	return(
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
      		<Bookshelf
      			key="currentlyReading"
                books={this.props.shelfBooks.filter(book => book.shelf === "currentlyReading")}
                onChangeShelf={this.handleChangeShelf}
                shelftitle="Currently Reading"
      		/>
      		<Bookshelf
				key="wantToRead"
                books={this.props.shelfBooks.filter(book => book.shelf === "wantToRead")}
                onChangeShelf={this.handleChangeShelf}
                shelftitle="Want To Read"
      		/>
      		<Bookshelf
      			key="read"
                books={this.props.shelfBooks.filter(book => book.shelf === "read")}
                onChangeShelf={this.handleChangeShelf}
                shelftitle="Read"
      		/>
          </div>
        </div>
      </div>
    )
  }
}

export default BookShelfList;
