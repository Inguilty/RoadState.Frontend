import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => (
  <div class="jumbotron">
    <h1>Test Home</h1>
    <Link to="about" className="btn btn-primary btn-lg">
      Test linking
    </Link>
  </div>
);

export default HomePage;
