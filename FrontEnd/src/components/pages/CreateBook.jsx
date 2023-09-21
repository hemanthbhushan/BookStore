import { useState, useEffect, React } from "react";
import MyFormikComponent from "../common/Formik";
import axios from "axios";
import { Link } from "react-router-dom";
import WalletFormik from "../common/WalletFormik.jsx";
import {
  getCurrentAccount,
  getEthereumProvider,
  createContractInstance,
} from "../../commonEthFunctions";
import Abi from "../../Abi/BookContractAbi.json";
import { BOOKADDRESS } from "../../config";

const CreateBook = () => {
  const [response, setResponse] = useState(0);
  const [account, setAccount] = useState(null);
  const [connButtonText, setConnButtonText] = useState("");
  const [contarct, setContarct] = useState(null);

  const postDataToApi = async (data) => {
    console.log(data, "data");

    await axios
      .post("http://localhost:9000/books/postBook", data)
      .then((res) => setResponse(res.status));
  };
  const postDataToContract = async (data) => {
    try {
      const { title, author, publishYear, bookPrice } = data;
      const account = await getCurrentAccount();

      console.log(contarct.methods["token"].call(), "checkkkkkk");

      const estGas = await contarct.methods
        .listBookForSale([account, title, author, bookPrice, false])
        .estimateGas({
          from: account,
        });
      console.log("first");

      await contarct.methods
        .listBookForSale([account, title, author, bookPrice, false])
        .send({
          from: account,
          gas: estGas,
        })
        .then((tx) => {
          if (tx.status === true) {
            postDataToApi(data);
          } else {
            console.log(tx);
          }
        })
        .catch((error) => console.log(error, "error"));
    } catch (error) {
      console.log("error", error);
    }
  };
  const contarctInstance = async () => {
    const tempContarct = await createContractInstance(Abi, BOOKADDRESS);
    console.log(tempContarct);
    setContarct(tempContarct);
  };

  const handleSubmit = (data) => {
    console.log(data, "data");

    postDataToContract(data);
  };

  useEffect(() => {
    contarctInstance();
  }, []);

  console.log(contarct, "contarct");
  const heading = "Create Book";

  return (
    <div>
      <Link to="/"> Home</Link>
      <h1>{heading}</h1>
      <MyFormikComponent onSubmit={handleSubmit} />
      <WalletFormik
        setAccount={setAccount}
        setConnButtonText={setConnButtonText}
      />

      {connButtonText}
    </div>
  );
};

export default CreateBook;
