import { useState } from "react";
import styles from "./Register.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function Register() {
  let navigate = useNavigate(); //navigate to login
  const [isLoading, setIsLoading] = useState(false); // spinner
  const [messageError, setMessageError] = useState(""); //handle error

  async function handleRegister(values: any) {
    setIsLoading(true);
    await axios
      .post(`http://localhost:3000/user`, values)
      //  handle error
      .then((response) => {
        console.log(response);

        if (response.request.statusText === "Created") {
          setIsLoading(false);
          setMessageError("");
          navigate("/login");
        }
      })
      .catch((err) => {
        setIsLoading(false);
        setMessageError(
          `${err.response.data.param}  ${err.response.data.message}`
        );
      });
  }

  let validation = Yup.object({
    name: Yup.string()
      .required("name is required")
      .min(3, "name minlength is 3")
      .max(10, "name maxlength is 10"),
    email: Yup.string().required("email is required").email("email is invalid"),
    password: Yup.string()
      .required("password is required")
      .matches(
        /^[A-Z][a-z0-9]{5,10}$/,
        "password must start with uppercase..."
      ),
  }); // validation
  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    // validate,
    validationSchema: validation,
    onSubmit: handleRegister,
  });
  return (
    <>
      <div className="w-75 mx-auto py-4">
        <h3> Register Now:</h3>
        {/* for handle error */}
        {messageError.length > 0 ? (
          <div className="alert alert-danger">{messageError}</div>
        ) : null}
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="name">Name</label>
          <input
            className="form-control mv-2"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.name}
            type="text"
            name="name"
            id="name"
          />
          {formik.errors.name && formik.touched.name ? (
            <div className="alert alert-danger">{formik.errors.name}</div>
          ) : null}

          <label htmlFor="email">Email</label>
          <input
            className="form-control mv-2"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.email}
            type="emial"
            name="email"
            id="email"
          />
          {formik.errors.email && formik.touched.email ? (
            <div className="alert alert-danger">{formik.errors.email}</div>
          ) : null}

          <label htmlFor="password">password</label>
          <input
            className="form-control mv-2"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.password}
            type="password"
            name="password"
            id="password"
          />
          {formik.errors.password && formik.touched.password ? (
            <div className="alert alert-danger">{formik.errors.password}</div>
          ) : null}

          {/* disable & submit btn */}
          {isLoading ? (
            <button type="button" className="btn btn-success text-white mt-3">
              <i className="fas fa-spinner fa-spin"></i>
            </button>
          ) : (
            <button
              disabled={!(formik.isValid && formik.dirty)}
              type="submit"
              className="btn btn-success text-white mt-3"
            >
              Register
            </button>
          )}
        </form>
      </div>
    </>
  );
}
