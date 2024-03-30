import "./BookForm.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addBook,
  fetchBook,
  selectIsLoadingViaAPI,
} from "../../redux/slices/booksSlice";
import { setError } from "../../redux/slices/errorSlice";
import booksData from "../../data/books.json";
import createBooKWithID from "../../utils/createBookWithID";

import { FaSpinner } from "react-icons/fa";

const BookForm = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const isLoadingViaApi = useSelector(selectIsLoadingViaAPI);

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

      dispatch(addBook(createBooKWithID({ title, author }, "manual")));
      setTitle("");
      setAuthor("");
    } else {
      dispatch(setError("You must fill title and author!"));
    }
  };

  const handleAddRandomBook = () => {
    const randomIndex = Math.floor(Math.random() * booksData.length);
    const randomBook = booksData[randomIndex];
    // const randomBookWithID = createBooKWithID(randomBook); //imported function from other file createBookWithID
    dispatch(addBook(createBooKWithID(randomBook, "random")));
  };

  //Working method,but better store it in redux

  // const thunkFunction = async (dispatch, getState) => {
  //   console.log(getState())
  //   try {
  //     const res = await axios.get("http://localhost:4000/random-book");
  //     if (res?.data?.title && res?.data?.author) {
  //       dispatch(addBook(createBooKWithID(res.data, "API")));
  //     }
  //   } catch (error) {
  //     alert("Network Error", error);
  //   }
  // };

  const handleAddRandomBookApi = () => {
    dispatch(fetchBook("http://localhost:4000/random-book-delayed")); //delayed adding book
    // dispatch(fetchBook("http://localhost:4000/random-book")); //Immidiately adding book
    // dispatch(fetchBook("http://localhost:3000/random-book")); Error test
  };

  return (
    <div className="app-block book-form">
      <h2>Add New Book</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            autoComplete="off"
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="author">Author:</label>
          <input
            autoComplete="off"
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

        <button
          type="button"
          onClick={handleAddRandomBookApi}
          disabled={isLoadingViaApi}
        >
          {isLoadingViaApi ? (
            <>
              <span>Loading Book...</span>
              <FaSpinner className="spinner" />
            </>
          ) : (
            "Add Random via Api"
          )}
        </button>
      </form>
    </div>
  );
};

export default BookForm;
