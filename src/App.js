import React from "react";
import { Switch, Route } from "react-router-dom";
// import "./App.css";

import Login from "./components/Login";
import Home from "./components/Home";
import NotFound from "./components/NotFound";

const App = () => {
  return (
    <div>
      <Switch>
        <Route exact path={["/", "/home"]} component={Home} />
        <Route path="/login" component={Login} />
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
