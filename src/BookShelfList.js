import React from 'react'
import Bookshelf from './Bookshelf.js'

import * as BooksAPI from "./BooksAPI";
import "./app.css";

class BookShelfList extends React.Component {
  render() {
    let shelfsNames = ["currentlyReading", "wantToRead", "read"];
    let eachShelf = shelfsNames.map((oneShelf, index) => {
      return (
        <Bookshelf
          key={shelfsNames[index]}
          value={shelfsNames[index]}
          books={this.props.shelfBooks.filter(oneShelf => oneShelf.shelf === shelfsNames[index])}
          shelftitle={shelfsNames[index]}
          onChange={this.props.handleBooks}
        />
      )
    });

  	return(
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
      		{eachShelf}
          </div>
        </div>
      </div>
    )
  }
}

export default BookShelfList;
