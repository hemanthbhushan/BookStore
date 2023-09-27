import { useState } from "react";
import axios from "axios";
import LoginFormik from "../common/LoginFormik";

const Signin = () => {
  const [loginStatus, setLoginStatus] = useState("");
  const postDataToApi = async (data) => {
    try {
      await axios
        .post("http://localhost:9000/books/signin", data)
        .then((res) => console.log(res.data.message, "res.data.message"));
    } catch (error) {
      setLoginStatus(error.response.data.message);
    }
  };
  console.log(loginStatus);

  const handleSubmit = (data) => {
    postDataToApi(data);
  };
  return (
    <>
      <LoginFormik onSubmit={handleSubmit} />
      {loginStatus}
    </>
  );
};

export default Signin;
