import "./BookForm.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addBook } from "../../redux/books/actionCreators";
import booksData from "../../data/books.json";
import createBooKWithID from "../../utils/createBookWithID";

const BookForm = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (title && author) {
      //dispatch action
      // const book = {
      //   title, // title: title
      //   author, //author: author
      //   id: uuidv4(), //random id for every book
      //   isFavorite: false, //initial value for favorite
      // };

      // const book = createBooKWithID({ title, author }); //imported function from other file createBookWithID

      // console.log(addBook(book));

      dispatch(addBook(createBooKWithID({ title, author })));
      setTitle("");
      setAuthor("");
    }
  };

  const handleAddRandomBook = () => {
    const randomIndex = Math.floor(Math.random() * booksData.length);
    const randomBook = booksData[randomIndex];
    // const randomBookWithID = createBooKWithID(randomBook); //imported function from other file createBookWithID
    dispatch(addBook(createBooKWithID(randomBook)));
  };

  return (
    <div className="app-block book-form">
      <h2>Add New Book</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="author">Author:</label>
          <input
            type="text"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <button type="submit">Add Book</button>
        {/* Random Book Adding */}
        <button type="button" onClick={handleAddRandomBook}>
          Add Random
        </button>
      </form>
    </div>
  );
};

export default BookForm;
