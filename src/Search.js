import React from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import Book from "./Book"
import "./app.css";

class Search extends React.Component {

  updateQuery = (e) => {
    console.log(e.target.value);
    let input = e.target.value;
    this.props.onChangeQuery(input);
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
              type="search"
              name="search"
              placeholder="Search by title or author"
              aria-label="Search through site content"
              onChange={this.updateQuery}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {
              this.props.shelfBooks.map((book) => {
                return (
                  <Book
                  key={book.id}
                  books={this.props.shelfBooks}
                  bookId={book.id}
                  bookThumbnail={(book.imageLinks) ? book.imageLinks.thumbnail : null}
                  bookShelf={book.shelf}
                  bookTitle={book.title}
                  bookAuthor={book.authors}
                  onHandler={this.props.handleBooks}
                  />
                )
              })
            }
          </ol>
        </div>
      </div>
    );
  }
}
export default Search;
