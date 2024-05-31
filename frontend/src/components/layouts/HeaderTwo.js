import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const HeaderTwo = () => {
  return (
    <Fragment>
      <div className="header-2">
        <nav class="navbar">
          <Link to="/home">Home</Link>
          <Link to="#featured">About us</Link>
          <Link to="#arrivals">Our Products</Link>
          <Link to="#reviews">Our location</Link>
          <Link to="#blogs">blogs</Link>
        </nav>
      </div>
    </Fragment>
  );
};

export default HeaderTwo;
