import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const NonFoundPage = () => {
  return (
    <Fragment>
      <div className="row wrapper">
        <div className="d-flex justify-content-center page-not-found-wrapper">
          <img
            src="/images/404.png"
            height="550"
            width="550"
            alt="404_not_found"
          />
        </div>
        <h5 className="text-center">
          Page Not Found. Go to <Link to="/">Homepage</Link>
        </h5>
      </div>
    </Fragment>
  );
};

export default NonFoundPage;
