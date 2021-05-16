import { Button, Grid, makeStyles, TextField, Snackbar, IconButton } from "@material-ui/core";

import MuiAlert from '@material-ui/lab/Alert';
import React, { useState } from "react";
import axios from "axios";
import AppBar from "./AppBar";


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

export default function Register() {
  const classes = useStyles();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = useState(false)
  const handleSubmit = () => {
    console.log(name, email, password);
    axios
      .post(`http://${process.env.REACT_APP_PORT}:5000/auth/register`, {
        name: name,
        email: email,
        password: password,
      })
      .then((response) => {
          console.log(response)
          if(response.status==200){
            setOpen(true)
          }
        });
  };
  const handleClose = ( ) =>{
      setOpen(false)
  }
  return (
    <React.Fragment>
      <AppBar />
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
              id="input-name"
              label="name"
              type="text"
              helperText="Enter user name"
              onChange={(e) => setName(e.target.value)}
            />
            <br />
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
              Register
            </Button>
          </div>
        </form>
      </Grid>
      <Snackbar anchorOrigin={{vertical: 'top', horizontal: 'right'}} autoHideDuration={6000} open={open} onClose={handleClose}>
          <Alert onClose={handleClose} severity='success'>
              User registered successfully, Login to continue.
          </Alert>
      </Snackbar>
    </React.Fragment>
  );
}
