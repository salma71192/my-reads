import React from 'react';
import * as BooksAPI from './BooksAPI';


function Book(props) {
    return(
      <li key={props.bookId} className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: "url(" + props.bookThumbnail + ")"
            }}
          />
          <div className="book-shelf-changer">
            <select value={props.bookShelf || "none"} onChange={(e) => props.onHandler(props.bookId, e)}>
              <option disabled>
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
          {props.bookTitle}
        </div>
        <div className="book-authors">
          {props.bookAuthor &&
            <div className="book-authors">
              {props.bookAuthor[0]}
            </div>}
        </div>
      </li>
    )
}

export default Book
