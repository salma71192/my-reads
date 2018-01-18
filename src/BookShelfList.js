import React from 'react'
import Bookshelf from './Bookshelf.js'

import * as BooksAPI from "./BooksAPI";
import "./app.css";

class BookShelfList extends React.Component {


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
