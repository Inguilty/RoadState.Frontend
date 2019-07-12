import React from 'react';
import Header from './components/layout/Header';
import { Route, Switch } from 'react-router-dom';
import HomePage from './components/pages/home';
import AboutPage from './components/pages/about';
import PageNotFound from './components/pages/pagenotfound';
import TestForm from './components/pages/test';
import ViewBugReportComponent from './components/pages/viewbugreport/ViewBugReportComponent';

const App = props => (
  <div className='container-fluid'>
    <Header />
    <div className='jumbotron'>
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route path='/about' component={AboutPage} />
        <Route path='/test' component={TestForm} />
        <Route path='/view' component={ViewBugReportComponent} />
        <Route component={PageNotFound} />
      </Switch>
    </div>
  </div>
);

export default App;
