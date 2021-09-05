import React, { useState } from "react";
import { Redirect } from "react-router";
import { signup, isAuthenticated } from "./helper";
import { Link, useHistory } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import InputAdornment from "@material-ui/core/InputAdornment";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import IconButton from "@material-ui/core/IconButton";
import InputLabel from "@material-ui/core/InputLabel";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import Typography from "@material-ui/core/Typography";
import Error from "./Error";
import Layout from "./Layout";
import styles from "./styles/form.module.css";
import CircularProgress from "@material-ui/core/CircularProgress";

const Alert = (props) => <MuiAlert elevation={6} variant="filled" {...props} />;

const Signup = () => {
  const history = useHistory();
  const [values, setValues] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    error: "",
    success: false,
    loading: false,
    showPassword: false,
  });

  const {
    firstname,
    lastname,
    email,
    password,
    success,
    showPassword,
    loading,
  } = values;

  const handleChange = (name) => (event) => {
    event.preventDefault();
    setValues({
      ...values,
      error: "",
      success: false,
      [name]: event.target.value,
    });
  };

  const handleClickShowPassword = () =>
    setValues({ ...values, showPassword: !showPassword });

  const handleMouseDownPassword = (event) => event.preventDefault();

  const handleClose = () => setValues({ ...values, error: "", success: false });

  const handleSubmition = (event) => {
    event.preventDefault();

    setValues({ ...values, loading: true });

    signup({
      name: { first: firstname, last: lastname },
      email,
      password,
    })
      .then((response) => {
        console.log(response);
        if (!response || response.error)
          setValues({
            ...values,
            error: response.msg,
            success: false,
            loading: false,
          });
        else
          setValues({
            firstname: "",
            lastname: "",
            email: "",
            password: "",
            error: [],
            success: true,
            loading: false,
          });
      })
      .catch((error) => console.error(error));
  };

  const performRedirect = () => {
    if (isAuthenticated()) {
      if (history.location.state)
        return <Redirect to={history.location.state.pathname} />;
      return <Redirect to="/" />;
    }
  };

  const successMessage = () => (
    <Snackbar
      open={success}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert severity="success" onClose={handleClose}>
        Sign Up Successfull! <Link to="/signin">Sign In</Link>
      </Alert>
    </Snackbar>
  );

  const signupForm = () => {
    return (
      <Layout>
        {successMessage()}
        {performRedirect()}
        <Error values={values} setValues={setValues} />
        <div className={styles.container}>
          <form onSubmit={handleSubmition} className={styles.formContainer}>
            <TextField
              variant="outlined"
              id="firstname"
              label="First Name"
              value={firstname}
              onChange={handleChange("firstname")}
              style={{ margin: "20px 8px" }}
              fullWidth
            />
            <TextField
              variant="outlined"
              id="lastname"
              label="Last Name"
              value={lastname}
              onChange={handleChange("lastname")}
              style={{ margin: "20px 8px" }}
              fullWidth
            />
            <TextField
              variant="outlined"
              id="email"
              label="E-mail"
              type="email"
              value={email}
              onChange={handleChange("email")}
              style={{ margin: "20px 8px" }}
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
              Sign Up
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
              Already have an account?{" "}
              <Link to="/signin" className={styles.link}>
                Sign In
              </Link>
            </Typography>
          </div>
        </div>
      </Layout>
    );
  };

  return <div className="signup-container">{signupForm()}</div>;
};

export default Signup;
