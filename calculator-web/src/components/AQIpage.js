import {
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select,
  makeStyles,
  CircularProgress,
  TextField,
  Button,
  Paper,
  Box,
  Grid,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import AppBar from "./AppBar";
import WbSunnyIcon from '@material-ui/icons/WbSunny';
import AuthService from "./authentication/AuthProvider";
import axios from "axios";
import { Alert, AlertTitle } from '@material-ui/lab';
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > * + *": {
      marginLeft: theme.spacing(2),
    },
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    width: '40%',
    marginTop: '20px'
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function AQIpage() {
  const classes = useStyles();
  const [pollutantValue, setPollutantValue] = useState(null);
  const [pollutantName, setPollutantName] = useState("");
  const [user, setUser] = useState(null);
  const [updated, setUpdated] = useState(false);
  const [response, setResponse] = useState(false)
  const [aqi, setAQI] = useState(null)

  let history = useHistory();
  useEffect(() => {
    let u = AuthService.getCurrentUser();
    setUser(u);
    setUpdated(true);
  }, []);
  console.log("user", user);

  const handleClick = ()=>{
      axios.post(`http://${process.env.REACT_APP_PORT}:5000/aqi/aqi-calculator`,{
          pollutantName: pollutantName,
          pollutantValue: pollutantValue,
      },{
          headers:{
              'auth-token': user
          }
      }).then((result)=>{
          
            setAQI(result.data.aqi)
            setResponse(true)
      })
  }

  return (
    <React.Fragment>
      {!updated ? (
        <>
          <div className={classes.root}>
            <CircularProgress />
            <CircularProgress color="secondary" />
          </div>
        </>
      ) : !user ? (
        history.push("/login")
      ) : (
        <>
          <AppBar user={user} />
          <div style={{marginLeft: '35%', marginTop: '10%'}}>
            <FormControl className={classes.formControl}>
                <InputLabel id="pollutantName">Select a pollutant</InputLabel>
                <br />
                <Select
                native
                id="pollutantName"
                value={pollutantName}
                onChange={(e) => setPollutantName(e.target.value)}
                >
                <option aria-label="None" value="" />
                <option value={"PM2.5"}>PM2.5</option>
                <option value={"PM10"}>PM10</option>
                <option value={"CO"}>CO</option>
                <option value={"NO2"}>NO2</option>
                <option value={"SO2"}>SO2</option>
                <option value={"O3"}>Ozone</option>
                </Select>
            </FormControl>
            <br />
            <FormControl className={classes.formControl}>
                {/* <InputLabel id="ConcentrationLevel">
                Enter the concentration
                </InputLabel>
                <br/> */}
                <TextField
                id="ConcentrationLevel"
                label='Enter the concentration'
                variant="outlined"
                onChange={(e) => setPollutantValue(e.target.value)}
                />
            </FormControl>
            <br/>
            <Button style={{marginLeft:'15%', marginTop: '10px'}} variant='contained' color='primary' startIcon={<WbSunnyIcon/>} onClick={handleClick}>Calculate AQI</Button>
            {response?(
                <>
                  {aqi<50?(
                      <Alert severity='success' style={{width: '40%', marginTop: '10px'}}>
                          <AlertTitle>Good</AlertTitle>
                          The AQI index for {pollutantName} is {aqi}
                      </Alert>
                  ):(
                      <Alert severity='error' style={{width: '40%', marginTop: '10px'}}>
                          <AlertTitle>Hazardous</AlertTitle>
                          The AQI index for {pollutantName} is {aqi}
                      </Alert>
                  )}
                </>
            ):null}
          </div>
        </>
      )}
    </React.Fragment>
  );
}
