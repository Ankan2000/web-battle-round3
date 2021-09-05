import React from "react";
import {
  Switch,
  Route,
  BrowserRouter as Router,
  Link,
  Redirect,
} from "react-router-dom";
import Home from "./components/Home";
import Blog from "./components/Blog";
import MakeBlog from "./components/MakeBlog";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import { isAuthenticated } from "./components/helper";

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        return isAuthenticated() ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/signin", state: props.location }} />
        );
      }}
    />
  );
};

const NotFound = () => (
  <div>
    This page does not exist! <Link to="/">Go home</Link>
  </div>
);

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/signup" component={Signup} exact />
        <Route path="/signin" component={Signin} exact />
        <Route path="/blog/:blogId" component={Blog} exact />
        <PrivateRoute path="/create/blog" component={MakeBlog} exact />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
};

export default Routes;
