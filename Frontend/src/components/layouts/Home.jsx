import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
  const [books, setBooks] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:9000/books/")
      .then((response) => {
        setBooks(response.data);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  }, []);
  return (
    <div>
      <div>{books}</div>
      <Link to="/"> CreateBook</Link>
      <Link to="/edit"> editBook</Link>
      <Link to="/details"> show details</Link>
      <Link to="/delete"> deleteBook</Link>
      <Link to="/wallet">WalletConnect</Link>
      <Link to='/signin'>SignIn</Link>
      <Link to='/signup'>SignUp</Link>
    </div>
  );
};

export default Home;
