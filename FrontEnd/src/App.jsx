import React from "react";
import { Routes, Route } from "react-router-dom";
import CreateBook from "./pages/CreateBook";
import DeleteBook from "./pages/DeleteBook";
import EditBook from "./pages/EditBook";
import Home from "./pages/Home";
import ShowBook from "./pages/ShowBook";
import WalletConnect from "./pages/WalletConnect";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/postBook" element={<CreateBook />} />
      <Route path="/edit" element={<EditBook />} />
      <Route path="/details" element={<ShowBook />} />
      <Route path="/delete" element={<DeleteBook />} />
      <Route path="/wallet" element={<WalletConnect />} />
    </Routes>
  );
};

export default App;
