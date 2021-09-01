import React from "react";
import { Link } from "react-router-dom";
//import "bootstrap/dist/css/boostrap.min.css";

const Navbar = () => {
  return (
    <React.Fragment>
      <div className="row">
        <div className="imgContainer">
          <nav class="roller">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/6/6e/Football_%28soccer_ball%29.svg"
              alt="Football"
            />
          </nav>
          <Link to="/" style={{ textDecoration: "none" }}>
            <div className="row">
              <p className="homeText">Shoot Me Home!</p>
            </div>
          </Link>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Navbar;
