import React, { useState } from "react";
import axios from "axios";
import SignupFormik from "../common/SignupFormik";
import WalletFormik from "../common/WalletFormik";
import { Link } from "react-router-dom";

const Signup = () => {
  // State variables
  const [signupStatus, setSignupStatus] = useState("");
  const [account, setAccount] = useState(null);
  const [connButtonText, setConnButtonText] = useState("");
  const [jwtToken, setJwtToken] = useState("");

  // Function to send data to the API
  const postDataToApi = async (data) => {
    try {
      const response = await axios.post("http://localhost:9000/books/signup", data);
      const { token } = response.data;
      console.log(token, "res.data.token-------------");
      setJwtToken(token);
      setSignupStatus("");
    } catch (error) {
      console.error(error, "=========error=============");
      setSignupStatus(error.response.data.message);
    }
  };

  // Handle form submission
  const handleSubmit = (data) => {
    const { email, name, password } = data;

    const dataToSend = {
      email,
      name,
      walletAddress: account,
      password,
    };

    try {
      postDataToApi(dataToSend);
    } catch (error) {
      console.log(error, "error=----------------");
    }
  };

  return (
    <div>
      <SignupFormik onSubmit={handleSubmit} />
      <WalletFormik
        setAccount={setAccount}
        setConnButtonText={setConnButtonText}
      />
      <div>{connButtonText}</div>
      <br />
      <div>{jwtToken}</div>
      <br />
      {signupStatus === "already SignedUp" ? (
        <>
          {`${signupStatus} `}
          <Link to="/signin">Login here</Link>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Signup;
