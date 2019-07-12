import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import HomePage from "./components/home/HomePage";
import AboutPage from "./components/about/AboutPage";
import PageNotFound from "./PageNotFound";
import Header from "./components/templates/Header";
import ViewMap from "./components/viewmap/ViewMap";

const App = () => (
  <div class="container-fluid">
    <Header />
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route path="/about" component={AboutPage} />
      <Route component={PageNotFound} />
    </Switch>
    <ViewMap />
  </div>
);

export default App;
