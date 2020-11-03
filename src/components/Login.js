import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import CheckButton from "react-validation/build/button";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import AuthService from "../services/auth.service";
import Footer from "../components/costum/Footer";
import NotFound from "./NotFound";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        Silahkan Periksa Kembali!
      </div>
    );
  }
};

const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Login = (props) => {
  const form = useRef();
  const checkBtn = useRef();
  const classes = useStyles();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    setMessage("");
    setLoading(true);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      AuthService.login(username, password).then(
        () => {
          props.history.push("/");
          // window.location.reload();
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setLoading(false);
          setMessage(resMessage);
        }
      );
    } else {
      setLoading(false);
    }
  };

  return (
    <section style={{ backgroundColor: "white", height: 640 }}>
      {!user ? (
        <div maxWidth="sm">
          <CssBaseline />
          <div className={classes.paper}>
            <Typography component="h1" variant="h5" style={{ marginTop:100}}>
              Desa Cireundeu Cilograng
            </Typography>
            <Form onSubmit={handleLogin} ref={form}>
              <div className="form-group">
                <TextField
                  type="text"
                  className="form-control"
                  name="username"
                  value={username}
                  onChange={onChangeUsername}
                  validations={[required]}
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  id="email"
                  label="Email Address"
                />
              </div>

              <div className="form-group">
                <TextField
                  type="password"
                  className="form-control"
                  name="password"
                  value={password}
                  onChange={onChangePassword}
                  validations={[required]}
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  label="Password"
                  id="password"
                />
              </div>

              <div className="form-group">
                <Button
                  disabled={loading}
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  {loading && (
                    <span className="spinner-border spinner-border-sm"></span>
                  )}
                  <span>Login</span>
                </Button>
              </div>

              {message && <div>{message}</div>}
              <CheckButton style={{ display: "none" }} ref={checkBtn} />
            </Form>
            <Box mt={8}>
              <Footer />
            </Box>
          </div>
        </div>
      ) : (
        <NotFound />
      )}
    </section>
  );
};

export default Login;
