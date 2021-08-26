import React from "react";
import playersArray from "../data/playersData";
import { useState, useEffect } from "react";
import Teams from "./teams";
import { Link } from "react-router-dom";
import axios from "axios";

const Players = ({ match }) => {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    getPlayersData(match.params.id);
  }, [match.params.id]);

  const getPlayersData = async (id) => {
    try {
      let res = await axios.get(`http://localhost:3001/players/${id}`);
      const playersDataArray = JSON.parse(JSON.stringify(res.data));
      setPlayers(playersDataArray, players);
    } catch (error) {
      console.log(error.daata);
    }
  };

  return (
    <React.Fragment>
      <Teams teamChosen={match.params.id}></Teams>
      <div class="container">
        <div class="row">
          {players.map((player) => (
            <div class="col-sm" id="card">
              <div class="test">
                <img
                  src={`${player.img}`}
                  alt="Person"
                  class="card__image"
                ></img>
                <p class="card__name">
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
                  <button class="btn draw-border">Stats</button>
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
