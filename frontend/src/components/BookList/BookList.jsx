import "./BookList.css";
import { useSelector } from "react-redux";

const BookList = () => {
  const books = useSelector((state) => state.books); //books from books:booksReducer
  return (
    <div className="app-block book-list">
      <h2>Book List</h2>
      {books.length === 0 ? (
        <p>No books available</p>
      ) : (
        <ul>
          {books.map((book, index) => (
            <li key={book.id}>
              <div className="book-info">
                {++index}. {book.title} by <strong>{book.author}</strong>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BookList;
