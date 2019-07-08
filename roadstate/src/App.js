import React from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import HomePage from "./components/home/HomePage";
import AboutPage from "./components/about/AboutPage";
import PageNotFound from "./PageNotFound";
import Header from "./components/templates/Header";
import TestComponent from "./components/test/TestComponent";

const App = () => (
  <div class="container-fluid">
    <Header />
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route path="/about" component={AboutPage} />
      <Route path="/test" component={TestComponent} />
      <Route component={PageNotFound} />
    </Switch>
  </div>
);

export default App;
