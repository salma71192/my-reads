import React from 'react';
import Book from './Book'

function Bookshelf(props) {
  	return(
    	<div className="bookshelf">
        <h2 className="bookshelf-title">
          {props.shelftitle}
        </h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {props.books.map(book =>
              <Book
              key={book.id}
              books={props.books}
              bookId={book.id}
              bookThumbnail={(book.imageLinks) ? book.imageLinks.thumbnail : null}
              bookShelf={book.shelf}
              bookTitle={book.title}
              bookAuthor={book.authors}
              onHandler={props.onChange}
              />
            )}
          </ol>
        </div>
      </div>
    )
}

export default Bookshelf
