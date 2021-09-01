import React from "react";
import Teams from "./teams";

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
        <blockquote class="quote-box">
          <p class="quotation-mark">“</p>
          <p class="quote-text">
            That's how people that don't understand football analyse football.
          </p>

          <div class="blog-post-actions">
            <p class="blog-post-bottom">- Jose Mourinho -</p>
          </div>
        </blockquote>
      </div>
    </div>
  );
};

export default Home;

//   That's how people that don't understand football analyse football.
//   — Jose Mourinho
