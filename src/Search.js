import React from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import "./app.css";

class Search extends React.Component {
  state = {
    query: "",
    books: []
  }

  updateQuery = (query) => {
    this.setState({ query: query })
  }

  updateBookOnSearch(book, shelf) {
    let temp = this.state.books;
    const bookToUpdate = temp.filter(t => t.id === book.id)[0];
    bookToUpdate.shelf = shelf;
    this.setState({
      books: temp
    });
    this.props.onChangeShelf(book, shelf);
  }


  render() {
    BooksAPI.search(this.state.query, 20).then( data => {
    	this.setState({
    		books: data
  		})
  	})

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
              value={this.state.query}
              onChange={(event) => this.updateQuery(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.books.map(book =>
              <li key={book.id} className="book">
                <div className="book-top">
                  <div
                    className="book-cover"
                    style={{
                      width: 128,
                      height: 193,
                      backgroundImage: "url(" + book.imageLinks.thumbnail + ")"
                    }}
                  />
                  <div className="book-shelf-changer">
                    <select
                      value={book.shelf}
                      onChange={e => {
                        this.updateBookOnSearch(book, e.target.value);
                      }}
                    >
                      <option value="none" disabled>
                        Move to...
                      </option>
                      <option value="currentlyReading">Currently Reading</option>
                      <option value="wantToRead">Want to Read</option>
                      <option value="read">Read</option>
                      <option value="none">None</option>
                    </select>
                  </div>
                </div>
                <div className="book-title">
                  {book.title}
                </div>
                <div className="book-authors">
                  {book.authors &&
                    <div className="book-authors">
                      {book.authors[0]}
                    </div>}
                </div>
              </li>
            )}
          </ol>
        </div>
      </div>
    );
  }
}
export default Search;
