import React from "react";
import "./App.css";
import Header from "./components/layout/Header";
import { Route, Switch } from "react-router-dom";
import HomePage from "./components/pages/home";
import AboutPage from "./components/pages/about";
import PageNotFound from "./components/pages/pagenotfound";
import TestForm from "./components/pages/test";
import ViewMap from "./components/viewmap/ViewMap";

const App = props => (
  <div className="container-fluid">
    <Header />
    <div className="jumbotron">
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/about" component={AboutPage} />
        <Route path="/test" component={TestForm} />
        <Route component={PageNotFound} />
      </Switch>
    </div>
    <ViewMap />
  </div>
);

export default App;
