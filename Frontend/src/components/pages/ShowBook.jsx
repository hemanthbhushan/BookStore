import axios from "axios";

import { useState, useEffect, React } from "react";
import { Link } from "react-router-dom";

const ShowBook = () => {
  const [books, setBookDetails] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:9000/books/getBooks")
      .then((response) => {
        setBookDetails(response.data.data);
        console.log(response.data.data[0].title);
      })
      .catch((error) => console.log(error));
  }, []);
  console.log(books, "bookDetails");
  return (
    <div>
      <Link to="/">Home</Link>

      <table>
        <thead>
          <tr>
            <th>Book Name</th>
            <th>Author</th>
            <th>publishYear</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book, index) => (
            <tr key={index}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.publishYear}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ShowBook;
