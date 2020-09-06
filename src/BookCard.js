import React from "react"

import GenreTag from "./GenreTag"

import "./book-card.scss"

const BookCard = ({ isbn, name, author, genre, pages, hasBookBeenRead, remove, toggle }) => {

  function formatGenres() {
    if (genre) {
      return (
        genre.map(item => {
          return (
            <GenreTag
              tag={item}
            />
          )
        })
      )
    }
    else {
      return false
    }

  }

  return (
    <div className="book-card">
      <div className="card-info">
        <ul className="book-info">
          <li className="book-title">{name}</li>
          <li>by {author}</li>
          <li>Genre: {formatGenres()}</li>
          <li>Pages: {pages}</li>
          <li>ISBN: {isbn}</li>
        </ul>
      </div>
      <div className="card-controls">
        <span className={hasBookBeenRead ? "read" : "un-read"}onClick={() => toggle(isbn)}>
          {hasBookBeenRead ? "Read" : "Un-Read"}
        </span>
        <button type="button" onClick={() => remove(isbn)}>
          Remove
        </button>
      </div>
    </div>
  )
}

export default BookCard
