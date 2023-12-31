import { useState, useEffect, React } from "react";
import MyFormikComponent from "../common/Formik";
import axios from "axios";
import WalletFormik from "../common/WalletFormik.jsx";
import {
  getCurrentAccount,
  getEthereumProvider,
  createContractInstance,
  callSendMethod,
} from "../../commonEthFunctions";
import Abi from "../../Abi/BookContractAbi.json";
import { BOOKADDRESS } from "../../config";

const CreateBook = () => {
  const [response, setResponse] = useState(0);
  const [account, setAccount] = useState(null);
  const [connButtonText, setConnButtonText] = useState("");
  const [contarct, setContarct] = useState(null);

  const postDataToApi = async (data) => {
    await axios
      .post("http://localhost:9000/books/postBook", data)
      .then((res) => setResponse(res.status));
  };
  const postDataToContract = async (data) => {
    try {
      const { title, author, publishYear, bookPrice } = data;

      const tempData = [account, title, author, bookPrice, false];

      await callSendMethod(
        Abi,
        BOOKADDRESS,
        account,
        "listBookForSale",
        tempData
      )
        .then((tx) => {
          if (tx) {
            postDataToApi(data)
              .then((res) => console.log(res))
              .catch((error) => console.error(error));
          }
        })
        .catch((error) => console.error(error));
    } catch (error) {
      console.error(error);
    }
  };
  const contarctInstance = async () => {
    const tempContarct = await createContractInstance(Abi, BOOKADDRESS);
    console.log(tempContarct);
    const tempAccount = await getCurrentAccount();
    setAccount(tempAccount);

    setContarct(tempContarct);
  };

  const handleSubmit = (data) => {
    postDataToContract(data);
  };

  useEffect(() => {
    contarctInstance();
  }, []);

  console.log(contarct, "contarct");
  const heading = "Create Book";

  return (
    <div>
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
