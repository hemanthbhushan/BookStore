import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";

const CreateBookFormik = ({ onSubmit }) => {
  const initialValues = {
    title: "",
    author: "",
    publishYear: 0,
    bookPrice: 0,
  };

  const validate = (values) => {
    const errors = {};

    if (!values.title) {
      errors.title = "Book Title is required";
    }

    if (!values.author) {
      errors.author = "Author is required";
    }

    if (!values.publishYear) {
      errors.publishYear = "Publish Year is required";
    } else if (isNaN(values.publishYear)) {
      errors.publishYear = "Publish Year must be a number";
    }
    if (!values.bookPrice) {
      errors.bookPrice = "Publish Year is required";
    } else if (isNaN(values.bookPrice)) {
      errors.bookPrice = "Publish Year must be a number";
    }

    return errors;
  };

  const handleSubmit = (values, { resetForm }) => {
    onSubmit(values);
    // resetForm();
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validate={validate}
        onSubmit={handleSubmit}
      >
        <Form>
          <div>
            <label htmlFor="title">Book Title</label>
            <Field type="text" id="title" name="title" />
            <ErrorMessage name="title" component="div" className="error" />
          </div>

          <div>
            <label htmlFor="author">Author</label>
            <Field type="text" id="author" name="author" />
            <ErrorMessage name="author" component="div" className="error" />
          </div>

          <div>
            <label htmlFor="publishYear">Publish Year</label>
            <Field type="number" id="publishYear" name="publishYear" />
            <ErrorMessage
              name="publishYear"
              component="div"
              className="error"
            />
          </div>
          <div>
            <label htmlFor="bookPrice">Price</label>
            <Field type="number" id="bookPrice" name="bookPrice" />
            <ErrorMessage
              name="bookPrice"
              component="div"
              className="error"
            />
          </div>

          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </div>
  );
};

export default CreateBookFormik;
