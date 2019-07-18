import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import configureStore from './store/configureStore';
import { Provider as ReduxProvider } from 'react-redux';
import { createBrowserHistory as history } from 'history';
import { configureFakeBackend } from './__mock__/fakeBackend.js';
configureFakeBackend();

const store = configureStore();

ReactDOM.render(
  <ReduxProvider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </ReduxProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
