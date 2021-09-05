import React from "react";
import { useState, useEffect } from "react";
import Teams from "./teams";
import { Link } from "react-router-dom";
import axios from "axios";

const Players = ({ match }) => {
  const [players, setPlayers] = useState([]);
  const [color, setColor] = useState("");
  const port = process.env.PORT || 3001;

  useEffect(() => {
    getPlayersData(match.params.id);
    // eslint-disable-next-line
  }, [match.params.id]);

  const getPlayersData = async (id) => {
    try {
      let res = await axios.get(`http://localhost:${port}/players/${id}`);
      const playersDataArray = JSON.parse(JSON.stringify(res.data));
      setPlayers(playersDataArray, players);
      getTeamColor(match.params.id);
    } catch (error) {
      console.log(error.daata);
    }
  };
  const getTeamColor = async (id) => {
    try {
      let res = await axios.get(`http://localhost:${port}/teams/${id}`);
      const data = JSON.parse(JSON.stringify(res.data));
      setColor(
        data.map((Team) => Team.color),
        color
      );
    } catch (error) {
      console.log(error.daata);
    }
  };

  return (
    <React.Fragment>
      <div className="row">
        <Teams teamChosen={match.params.id}></Teams>
      </div>
      <div className="container">
        <div className="row">
          {players.map((player) => (
            <div key={player.id} className="col-sm" id="card">
              <div className="test">
                <img
                  src={`${player.img}`}
                  alt="Person"
                  className="card__image"
                  id={`numberBoxShadow${color}`}
                ></img>
                <p
                  className="card__name"
                  style={{
                    fontFamily: "arial",
                    paddingTop: "5px",
                    color: "white",
                  }}
                >
                  {player.name.length < 20
                    ? player.name
                    : player.name.split(" ")[0] +
                      " ".concat(
                        player.name.split(" ")[
                          player.name.split(" ").length - 1
                        ]
                      )}
                  <span> #{player.shirtNumber}</span>
                </p>
                <Link to={`../playerStats/${player.id}`}>
                  <button className="btn draw-border">Stats</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Players;
