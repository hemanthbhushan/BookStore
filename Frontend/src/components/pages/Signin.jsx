import { useState, useEffect } from "react";
import axios from "axios";
import LoginFormik from "../common/LoginFormik";
import WalletFormik from "../common/WalletFormik";
import { Link } from "react-router-dom";

import CreateBook from "./CreateBook";

const Signin = () => {
  const [loginStatus, setLoginStatus] = useState("");
  const [account, setAccount] = useState(null);
  const [connButtonText, setConnButtonText] = useState("");
  const [jwtToken, setJwtToken] = useState("");
  

  const postDataToApi = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:9000/books/signin",
        data // Send the request data as the second argument
      );

      const { token } = response.data;
      console.log(token, "res.data.token-------------");
     
      setJwtToken(token);
      setLoginStatus("");
    } catch (error) {
      setLoginStatus(error.response.data.message);
      console.log(error, "errorr=============");
    }
  };

  console.log(loginStatus);

  const handleSubmit = (data) => {
    const { email, password } = data;

    const dataToSend = {
      email,
      walletAddress: account,
      password,
    };
    postDataToApi(dataToSend);
  };
  useEffect(() => {
    setLoginStatus("");
  }, [account]);

  return (
    <>
      <LoginFormik onSubmit={handleSubmit} />
      <WalletFormik
        setAccount={setAccount}
        setConnButtonText={setConnButtonText}
      />
      <div>{connButtonText}</div>
      {loginStatus === "Need to Sign Up" ? (
        <>
          {`${loginStatus} `}
          <Link to="/signin">Signup here</Link>
        </>
      ) : (
        <></>
      )}
      {loginStatus === "Invalid Credentials" ? (
        <>
          <div>{loginStatus}</div>
        </>
      ) : (
        <></>
      )}

      {jwtToken}
    </>
  );
};

export default Signin;
