import { useState, useEffect, React } from "react";
import MyFormikComponent from "../components/Formik";
import axios from "axios";
import { Link } from "react-router-dom";

const CreateBook = () => {
  const [response, setResponse] = useState(0);

  const postDataToApi = async (data) => {
    console.log(data, "data");
    await axios
      .post("http://localhost:9000/books/postBook", data)
      .then((res) => setResponse(res.status));
  };

  const handleSubmit = (data) => {
    postDataToApi(data);
  };

  const heading = "Create Book";

  return (
    <div>
      <Link to="/"> Home</Link>
      <h1>{heading}</h1>
      <MyFormikComponent onSubmit={handleSubmit} />
    </div>
  );
};

export default CreateBook;
