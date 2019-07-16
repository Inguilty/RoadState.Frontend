import React from 'react';
import { NavLink } from 'react-router-dom';

const PageNotFound = props => (
  <div className="row">
    <div className="col-md-12">
      <div className="error-template">
        <h1>Oops!</h1>
        <h2>Page not found exception</h2>
        <div className="error-details">
          An error has been occured. The requested page is not found!
        </div>
        <div className="error-actions">
          <NavLink className="btn btn-lg" to="/" exact>
            <span className="glyphicon glyphicon-home">
              Return to home page
            </span>
          </NavLink>
        </div>
      </div>
    </div>
  </div>
);

export default PageNotFound;
