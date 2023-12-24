import { useEffect, useState } from "react";
import styles from "./Login.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

interface UserData {
  linkedInPhotoUrl: string;
  linkedInName: string;
  email: string;
}

export default function Login({ saveuserData }: any) {
  let navigate = useNavigate(); //navigate to login
  const [isLoading, setIsLoading] = useState(false); // spinner
  const [messageError, setMessageError] = useState(""); //handle error

  async function handleLogin(values: any) {
    setIsLoading(true);
    await axios
      .post(`http://localhost:3000/auth/login`, values)
      //  handle error
      .then((response) => {
        console.log(response);

        if (response.request.statusText === "Created") {
          // token
          localStorage.setItem("userToken", response.data.access_token);
          saveuserData();
          // loading & err & navigate
          setIsLoading(false);
          setMessageError("");
          navigate("/");
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
      email: "",
      password: "",
    },
    // validate,
    validationSchema: validation,
    onSubmit: handleLogin,
  });
  return (
    <>
      <div className="w-75 mx-auto py-4">
        <h3> Login Now:</h3>

        {/* for handle error */}
        {messageError.length > 0 ? (
          <div className="alert alert-danger">{messageError}</div>
        ) : null}
        <form onSubmit={formik.handleSubmit}>
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
              className="btn btn-success  mt-3"
            >
              Login
            </button>
          )}
        </form>
      </div>
    </>
  );
}
