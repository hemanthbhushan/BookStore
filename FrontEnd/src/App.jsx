import React from "react";
import { Routes, Route } from "react-router-dom";
import CreateBook from "./components/pages/CreateBook";
import DeleteBook from "./components/pages/DeleteBook";
import EditBook from "./components/pages/EditBook";
import Home from "./components/pages/Home";
import ShowBook from "./components/pages/ShowBook";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/postBook" element={<CreateBook />} />
      <Route path="/edit" element={<EditBook />} />
      <Route path="/details" element={<ShowBook />} />
      <Route path="/delete" element={<DeleteBook />} />
    </Routes>
  );
};

export default App;
