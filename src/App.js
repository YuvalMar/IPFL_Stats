import "./App.css";
import players from "./components/players";
import React from "react";
import playerStats from "./components/playerStats";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import home from "./components/home";

function App() {
  const renderApp = () => {
    return (
      <React.Fragment>
        <Router>
          <Navbar></Navbar>
          <Switch>
            <Route path="/" exact component={home}></Route>
            <Route path="/players/:id" exact component={players}></Route>
            <Route path="/playerStats/:id" component={playerStats}></Route>
          </Switch>
        </Router>
      </React.Fragment>
    );
  };

  return <div className="App">{renderApp()}</div>;
}

export default App;
