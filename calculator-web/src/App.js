import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import AuthService from "./components/authentication/AuthProvider";
import AQIpage from "./components/AQIpage";
function App() {
  // const [user, setUser] = useState(null);
  // useEffect(() => {
  //   const user = AuthService.getCurrentUser();
  //   setUser(user);
  //   //console.log('user loaded',user)
  // }, []);
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path='/' render={()=><Redirect to='/login'/>}/> 
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          {/* {user ? (
            <Route path="/aqi">
              <AQIpage />
            </Route>
          ) : <Redirect to='/login'/>} */}
          <Route path='/aqi'>
            <AQIpage/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
