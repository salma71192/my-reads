import React from 'react';
import * as BooksAPI from './BooksAPI';


class Book extends React.Component {

  handleChangeShelf = (bookId, e) => {
    let allBooks = this.props.books;
    const book = allBooks.filter(oneBook => oneBook.id === bookId)[0];
    BooksAPI.update(book, e.target.value).then(response => {
      this.setState({
        books: allBooks
      });
    });
  }

  render() {

    return(
      <li key={this.props.bookId} className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: "url(" + this.props.bookThumbnail + ")"
            }}
          />
          <div className="book-shelf-changer">
            <select value={this.props.bookShelf} onChange={e => this.handleChangeShelf(this.props.bookId, e)}>
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
          {this.props.bookTitle}
        </div>
        <div className="book-authors">
          {this.props.bookAuthor &&
            <div className="book-authors">
              {this.props.bookAuthor[0]}
            </div>}
        </div>
      </li>
    )
  }
}

export default Book
