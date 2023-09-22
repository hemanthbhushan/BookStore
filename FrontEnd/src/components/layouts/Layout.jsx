import React from "react";
import { Routes, Route } from "react-router-dom";
import CreateBook from "../pages/CreateBook";
import DeleteBook from "../pages/DeleteBook";
import EditBook from "../pages/EditBook";
import ShowBook from "../pages/ShowBook";

const Layout = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<CreateBook />} />
        <Route path="/edit" element={<EditBook />} />
        <Route path="/details" element={<ShowBook />} />
        <Route path="/delete" element={<DeleteBook />} />
      </Routes>
    </>
  );
};

export default Layout;
