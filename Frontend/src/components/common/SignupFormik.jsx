import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";

const LoginFormik = ({ onSubmit }) => {
  const initialValues = {
    email: "",
    name: "",
    password: "",
  };

  const validate = (values) => {
    const errors = {};

    if (!values.email) {
      errors.email = "email is required";
    }
    if (!values.name) {
      errors.name = "name  is required";
    }

    if (!values.password) {
      errors.password = "password  is required";
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
            <label htmlFor="email">Gmail</label>
            <Field type="text" id="email" name="email" />
            <ErrorMessage name="email" component="div" className="error" />
          </div>
          <div>
            <label htmlFor="name">Name</label>
            <Field type="text" id="name" name="name" />
            <ErrorMessage name="name" component="div" className="error" />
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <Field type="text" id="password" name="password" />
            <ErrorMessage name="password" component="div" className="error" />
          </div>

          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </div>
  );
};

export default LoginFormik;