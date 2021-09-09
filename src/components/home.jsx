import React from "react";
import Teams from "./teams";
// Home page component
const Home = () => {
  return (
    <div>
      <div className="row">
        <Teams></Teams>
      </div>
      <div className="container" id="playerStatsLoader">
        <div className="row">
          <h1 className="welcomeRow">
            Welcome To Israeli Premier League Stats!
          </h1>
        </div>
        <blockquote className="quote-box">
          <p className="quotation-mark">“</p>
          <p className="quote-text">
            That's how people that don't understand football analyse football.
          </p>

          <div className="blog-post-actions">
            <p className="blog-post-bottom">- Jose Mourinho -</p>
          </div>
        </blockquote>
      </div>
    </div>
  );
};

export default Home;

//   That's how people that don't understand football analyse football.
//   — Jose Mourinho
