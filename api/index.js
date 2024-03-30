//npm start for starting server
//npm run dev with nodemon for watching for changes without restarting server
const express = require("express");
const cors = require("cors");
const booksData = require("./data/books.json");

const app = express();

app.use(cors());

function getRandomBook() {
  const randomIndex = Math.floor(Math.random() * booksData.length);
  const randomBook = booksData[randomIndex];
  return randomBook;
}

app.get("/random-book", (req, res) => {
  res.json(getRandomBook());
});

app.get("/random-book-delayed", (req, res) => {
  setTimeout(() => {
    res.json(getRandomBook());
  }, 1500);
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server is runnning on port ${port}`);
});
