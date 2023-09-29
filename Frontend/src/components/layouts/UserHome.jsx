import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const UserHome = () => {
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
      <Link to="/details"> showdetails</Link>
    </div>
  );
};

export default UserHome;
