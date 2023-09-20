import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

const WalletFormik = ({ onSubmit }) => {
  const initialValues = {
    walletAddress: "",
  };

  const validate = (values) => {
    const errors = {};

    if (!values.title) {
      errors.walletAddress = "Book Title is required";
    }

    return errors;
  };

  const handleSubmit = (values, { resetForm }) => {
    onSubmit(values);
    resetForm();
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
            <label htmlFor="title">WalletAddress</label>
            <Field type="text" id="walletAddress" name="walletAddress" />
            <ErrorMessage name="walletAddress" component="div" className="error" />
          </div>

          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </div>
  );
};

export default WalletFormik;
