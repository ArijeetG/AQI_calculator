import React, { useState } from "react";
import axios from "axios";
import AppBar from "./AppBar";
import {
  Button,
  Grid,
  makeStyles,
  TextField,
  Snackbar,
  IconButton,
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import { useHistory } from "react-router";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

export default function Login() {
  const history = useHistory();
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);
  const handleSubmit = () => {
    axios
      .post(`http://${process.env.REACT_APP_PORT}:5000/auth/login`, {
        email: email,
        password: password,
      })
      .then((response) => {
        
        if (response.status == 200) {
          if (response.data.error) {
            setLoginError(true);
            
          } else {
            localStorage.setItem(
              "user",
              JSON.stringify(response.data.authToken)
            );
            history.push("/aqi");
          }
        }
      });
  };

  return (
    <React.Fragment>
      <AppBar register={true} />
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        style={{ marginTop: "10%" }}
      >
        <form className={classes.root} noValidate autoComplete="off">
          <div
            style={{
              backgroundImage: "linear-gradient(#13E3C1,white)",
              width: "100%",
              alignItems: "center",
            }}
          >
            <TextField
              id="input-email"
              label="email"
              type="email"
              helperText="Enter email id"
              onChange={(e) => setEmail(e.target.value)}
            />
            <br />
            <TextField
              id="input-password"
              label="password"
              type="password"
              helperText="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <br />
            <Button
              color="primary"
              disableElevation
              style={{ marginLeft: "30%" }}
              onClick={handleSubmit}
            >
              Login
            </Button>
          </div>
        </form>
      </Grid>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        autoHideDuration={600}
        open={loginError}
        onClose={()=>setLoginError(false)}
      >
        <Alert severity="error" onClose={()=>setLoginError(false)}>Email or password incorrect.</Alert>
      </Snackbar>
    </React.Fragment>
  );
}
