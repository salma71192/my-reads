import React from 'react';
import Book from './Book'


class Bookshelf extends React.Component {
  render() {
  	return(
    	<div className="bookshelf">
        <h2 className="bookshelf-title">
          {this.props.shelftitle}
        </h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {this.props.books.map(book =>
              <Book
              key={book.id}
              books={this.props.books}
              bookId={book.id}
              bookThumbnail={book.imageLinks.thumbnail}
              bookShelf={book.shelf}
              bookTitle={book.title}
              bookAuthor={book.authors}
              />
            )}
          </ol>
        </div>
      </div>
    )
  }
}

export default Bookshelf
