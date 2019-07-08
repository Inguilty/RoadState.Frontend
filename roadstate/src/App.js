import React from "react";
import Header from "./common/Header";
import { Route, Switch } from "react-router-dom";
import HomePage from "./home/HomePage";
import AboutPage from "./about/AboutPage";
import PageNotFound from "./common/PageNotFound";
import TestForm from "./test/TestForm";

const App = props => (
  <div class="container-fluid">
    <Header />
    <div className="jumbotron">
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/about" component={AboutPage} />
        <Route path="/test" component={TestForm} />
        <Route component={PageNotFound} />
      </Switch>
    </div>
  </div>
);

export default App;
