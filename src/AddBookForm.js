import React, { useState } from "react"

import "./add-book-form.scss"

const AddBookForm = ({ addBookToLibrary }) => {

  const blankBook = {
    isbn: "",
    name: "",
    author: "",
    genre: "",
    pages: "",
    hasBookBeenRead: false
  }
  let [ bookToAdd, modifyBook  ] = useState(blankBook)
  let tempBook

/////////////////////////////////////////////////////////////////// Form handler
  const handleChange = (e) => {
    let valueToChange = e.target.name
    let newValue = e.target.value
    tempBook = bookToAdd

    if (valueToChange === "isbn") { // Handle ISBN entry and prevents empty string conflict
      for (let property in tempBook) {
        if (property === valueToChange) {
          if (newValue !== "") {
            tempBook[property] = parseInt(newValue)
          }
          else {
            tempBook[property] = newValue
          }
        }
      }
    }
    else if (valueToChange === "hasBookBeenRead") { // Handle read checkbox
      for (let property in tempBook) {
        if (property === valueToChange) {
          tempBook[property] = !tempBook[property]
        }
      }
    }
    else {
      for (let property in tempBook) { // Handle all other text fields
        if (property === valueToChange) {
          tempBook[property] = newValue
        }
      }
    }
    modifyBook(
      {
        isbn: tempBook.isbn,
        name: tempBook.name,
        author: tempBook.author,
        genre: tempBook.genre,
        pages: tempBook.pages,
        hasBookBeenRead: tempBook.hasBookBeenRead
      }
    )
  }

///////////////////////////////////////////////////////////////// Form submitter
  const formatGenreTags = () => {
    let genres = bookToAdd.genre
    let genreTags = genres.split(",");
    tempBook = {
      ...bookToAdd,
      genre: genreTags
    }
    return tempBook
  }

  const finaliseBook = () => {
    addBookToLibrary( formatGenreTags() )
    modifyBook( blankBook )
  }

///////////////////////////////////////////////////////////////////// Close Form
  const closeForm = () => {
    document.getElementById("add-book-container").classList.remove("visible")
    document.getElementById("open-form-button").classList.add("visible")
  }

//////////////////////////////////////////////////////////////////////////// JSX
  return(
    <div id="add-book-container">

      <header>
        <h1>New book</h1>
        <button className="close-form" onClick={() => closeForm()}>x</button>
      </header>

      <div className="subcontainer">
        <form className="add-book-form">
          <div>
            <section className="labels">
              <label htmlFor="name">Title</label>
              <label htmlFor="author">Author</label>
              <label htmlFor="genre">Genres</label>
              <label htmlFor="pages">Pages</label>
              <label htmlFor="isbn">ISBN</label>
              <label htmlFor="hasBookBeenRead">Read?</label>
            </section>

            <section className="inputs">
              <input name="name" type="text" value={bookToAdd.name} onChange={handleChange}/>
              <input name="author" type="text" value={bookToAdd.author} onChange={handleChange}/>
              <input name="genre" type="text" value={bookToAdd.genre} onChange={handleChange}/>
              <input name="pages" type="text" value={bookToAdd.pages} onChange={handleChange}/>
              <input name="isbn" type="text" value={bookToAdd.isbn} onChange={handleChange}/>
              <input className="checkbox" name="hasBookBeenRead" type="checkbox" value={bookToAdd.hasBookBeenRead} onChange={handleChange}/>
            </section>
          </div>
          <button type="button" onClick={() => finaliseBook()}>Add to Librio</button>
        </form>
      </div>
    </div>

  )
}

export default AddBookForm
