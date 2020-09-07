import React, { useState } from "react"

import BookCard from "./BookCard"
import AddBookForm from "./AddBookForm"
import Button from "./Button"
import initialLibrary from "./library"

import "./app.scss"

const App = () => {
  let [ library, makeChangeToLibrary ] = useState(initialLibrary)

  const addBookToLibrary = (bookToAdd) => {
    let newLibrary = [...library]
    newLibrary.push(bookToAdd)
    makeChangeToLibrary(
      newLibrary
    )
  }

  const removeBookFromLibrary = (isbn) => {
    let reply = window.confirm("Are you sure you want to remove that?")
    if (reply === true) {
      makeChangeToLibrary(
        library.filter( book => book.isbn !== isbn )
      )
    }
    else {
      return false
    }
  }

  const toggleReadStatus = (isbn) => {
    let books = [...library]
    books.map(book => {
      if (book.isbn === isbn) {
        for (let property in book ) {
          if (property === "hasBookBeenRead") {
            book[property] = !book[property]
          }
        }
      }
      return false
    })
    makeChangeToLibrary(
      books
    )
  }

  const openPopupForm = () => {
    document.getElementById("add-book-container").classList.add("visible")
    document.getElementById("open-form-button").classList.remove("visible")
  }

  return (
    <div className="app">
      <header className="banner">
        <h1>Librio</h1>
      </header>
      <main>
        <Button
          id={"open-form-button"}
          className={"visible"}
          label={"Add new book"}
          onClickFunction={openPopupForm}/>

        <AddBookForm
         addBookToLibrary={addBookToLibrary}/>
        <div className="book-cards-container">
          {
            library.map(book => {
              return (<BookCard
                key={book.isbn}
                isbn={book.isbn}
                name={book.name}
                author={book.author}
                genre={book.genre}
                pages={book.pages}
                hasBookBeenRead={book.hasBookBeenRead}

                remove={removeBookFromLibrary}
                toggle={toggleReadStatus} />)
            })
          }
        </div>
      </main>
    </div>
  )
}

export default App
