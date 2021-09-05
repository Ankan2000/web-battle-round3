import React, { useState } from "react";
import { Redirect, Link, useHistory } from "react-router-dom";
import { authenticate, isAuthenticated, signin } from "./helper";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import InputAdornment from "@material-ui/core/InputAdornment";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import IconButton from "@material-ui/core/IconButton";
import InputLabel from "@material-ui/core/InputLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Error from "./Error";
import Layout from "./Layout";
import styles from "./styles/form.module.css";
import CircularProgress from "@material-ui/core/CircularProgress";

const Signin = () => {
  const history = useHistory();
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
    didRedirect: false,
    showPassword: false,
  });

  const { email, password, didRedirect, showPassword, loading } = values;

  const handleChange = (name) => (event) =>
    setValues({ ...values, error: "", [name]: event.target.value });

  const handleSubmition = (event) => {
    event.preventDefault();
    setValues({ ...values, loading: true, didRedirect: false });
    signin({ email, password })
      .then((response) => {
        if (!response || response.error)
          setValues({
            ...values,
            error: response.msg,
            loading: false,
          });
        else {
          authenticate(response, () =>
            setValues({ ...values, didRedirect: true })
          );
        }
      })
      .catch((error) => console.error(error));
  };

  const handleClickShowPassword = () =>
    setValues({ ...values, showPassword: !showPassword });

  const handleMouseDownPassword = (event) => event.preventDefault();

  const performRedirect = () => {
    if (didRedirect || isAuthenticated()) {
      if (history.location.state) {
        return <Redirect to={history.location.state.pathname} />;
      }
      return <Redirect to="/" />;
    }
  };

  const signinForm = () => {
    return (
      <Layout>
        {performRedirect()}
        <Error values={values} setValues={setValues} />
        <div className={styles.container}>
          <form onSubmit={handleSubmition} className={styles.formContainer}>
            <TextField
              variant="outlined"
              id="email"
              label="E-mail"
              type="email"
              value={email}
              style={{ margin: "20px 8px" }}
              onChange={handleChange("email")}
              fullWidth
            />

            <FormControl
              variant="outlined"
              style={{ margin: "20px 8px" }}
              fullWidth
            >
              <InputLabel htmlFor="password">Password</InputLabel>
              <OutlinedInput
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={handleChange("password")}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                labelWidth={70}
              />
            </FormControl>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={loading}
            >
              Sign In
              {loading && (
                <CircularProgress
                  color="secondary"
                  className={styles.loader}
                  size={20}
                />
              )}
            </Button>
          </form>
          <div>
            <Typography variant="body1" gutterBottom>
              Don't have an account?{" "}
              <Link to="/signup" className={styles.link}>
                Sign Up
              </Link>
            </Typography>
          </div>
        </div>
      </Layout>
    );
  };

  return <div>{signinForm()}</div>;
};

export default Signin;
