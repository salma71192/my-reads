import React from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import Book from "./Book"
import "./app.css";

class Search extends React.Component {

  updateQuery = (e) => {
    this.props.onChangeQuery(e.target.value);
  }


  render() {

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              onChange={this.updateQuery}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.props.shelfBooks.map(book =>
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
    );
  }
}
export default Search;
