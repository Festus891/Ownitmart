import React, { Fragment, useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

import MetaData from "../layouts/MetaData";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { login, clearErrors } from "../../actions/userAction";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const alert = useAlert();
  const dispatch = useDispatch();
  const location = useLocation();

  const { isAuthenticated, error, loading } = useSelector(
    (state) => state.auth
  );

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (isAuthenticated) {
      navigate(redirect);
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, alert, error, isAuthenticated, navigate, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };
  return (
    <div>
      <Fragment>
        <MetaData title={"Login"} />
        <div className="row wrapper">
          <div className="col-10 col-lg-5">
            <form className="shadow-lg" onSubmit={submitHandler}>
              <h4 className="mb-3">Welcome to OwnItMart</h4>
              <p>
                Type your e-mail and password to log in or create a new account.
              </p>
              <div className="form-group">
                <label htmlFor="email_field">Email</label>
                <input
                  type="email"
                  id="email_field"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="password_field">Password</label>
                <input
                  type="password"
                  id="password_field"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <Link to="/password/forgot" className="float-left mb-4">
                Forgot Password?
              </Link>

              <button
                id="login_button"
                type="submit"
                className="btn btn-block py-3 mb-3"
              >
                LOGIN
              </button>

              <Link to="/register" className="mt-5 pb-5">
                Don't have an account? Sign up
              </Link>
            </form>
          </div>
        </div>
      </Fragment>
    </div>
  );
};

export default Login;
