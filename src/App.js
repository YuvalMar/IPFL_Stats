import "./App.css";
import players from "./components/players";
import Teams from "./components/teams";
import React from "react";
import playerStats from "./components/playerStats";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/navbar";

function App() {
  const path =
    "https://static.football.co.il/wp-content/themes/kingclub-theme/images/teams/";
  const pictures = ["14316.png", "4563.png", "4554.png", "4563.png"];
  const styleDis = { display: "inline" };
  const formatPictures = () => {
    return (
      <React.Fragment>
        <Router>
          <Navbar></Navbar>
          <Switch>
            <Route path="/" exact component={Teams}></Route>
            <Route path="/players/:id" exact component={players}></Route>
            <Route path="/playerStats/:id" component={playerStats}></Route>
          </Switch>
        </Router>
      </React.Fragment>
      // <ul>
      //   {pictures.map((picture) => (
      //     <li style={styleDis} key={picture}>
      //       <img
      //         src={`${path}${picture}`}
      //         alt="abba"
      //         style={{ width: "80px", height: "80px" }}
      //       ></img>
      //     </li>
      //   ))}
      // </ul>
    );
  };

  return <div className="App">{formatPictures()}</div>;
}

export default App;
