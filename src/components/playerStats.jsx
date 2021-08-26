import React from "react";
import { useState, useEffect } from "react";
import playerStatsData from "../data/playerStats";
import Teams from "./teams";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDoubleRight } from "@fortawesome/fontawesome-free-solid";
import { faShieldAlt } from "@fortawesome/fontawesome-free-solid";
import { faChartLine } from "@fortawesome/fontawesome-free-solid";
import { faHandsHelping } from "@fortawesome/fontawesome-free-solid";
import axios from "axios";

const PlayerStats = ({ match }) => {
  const [playerstats, setPlayerStats] = useState([]);
  const [color, setColor] = useState("");
  const [numberColor, setNumColor] = useState("");

  useEffect(() => {
    getPlayerStats(match.params.id);
  }, [match.params.id]);

  const getPlayerStats = async (id) => {
    try {
      let res = await axios.get(`http://localhost:3001/playerStats/${id}`);
      const playStatsArray = JSON.parse(JSON.stringify(res.data));
      setPlayerStats(playStatsArray, playerstats);
      getTeamColor(playStatsArray.teamId);
    } catch (error) {
      console.log(error.data);
    }
  };
  const getTeamColor = async (id) => {
    try {
      let res = await axios.get(`http://localhost:3001/teams/${id}`);
      const data = JSON.parse(JSON.stringify(res.data));
      setColor(
        data.map((Team) => Team.color),
        color
      );
    } catch (error) {
      console.log(error.daata);
    }
  };

  const keysMapping = (type) => {
    const keys = Object.keys(playerstats).filter(
      (key) => key != "img" && key != "id" && key != "teamId"
    );
    const zerokeys = keys.filter((key) => key.includes(type));
    return zerokeys;
  };

  const mapStats = (type) => {
    let iconString;
    let header;
    //TODO** Map Color By Team let boxShadowColor;
    switch (type) {
      case "1":
        iconString = faChartLine;
        header = "Numbers";
        break;
      case "2":
        iconString = faHandsHelping;
        header = "Passes";
        break;
      case "3":
        iconString = faAngleDoubleRight;
        header = "Attack";
        break;
      case "4":
        iconString = faShieldAlt;
        header = "Defense";
        break;
    }
    return (
      <div className="col-3">
        <div className="playerstats_container">
          <div className="playerstat_container">
            <div className="playerstat__details">
              <div className="playerstat__content" id={`boxShadowCard${color}`}>
                <div>
                  <FontAwesomeIcon icon={iconString} />
                </div>
                <h3 className="playerstat_header">{header}</h3>
                {keysMapping(type).map((key) => (
                  <div className="row">
                    <p className="item">
                      {" "}
                      {key
                        .replace(type, "")
                        .replace(/([A-Z])/g, " $1")
                        .trim()}{" "}
                      :{playerstats[key]}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const mapPlayerDetails = () => {
    //**TODO-> MAP NumberBoxShadow according to team color */
    return (
      <div className="box_conatiner">
        <div className="wrap">
          <div
            className="box one"
            style={{
              backgroundImage: `url(${playerstats.img})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <h1>{playerstats.name}</h1>
            <div className="poster p1" id={`numberBoxShadow${color}`}>
              <h4>{playerstats.number}</h4>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <React.Fragment>
      <Teams teamChosen={playerstats["teamId"]}></Teams>

      <div className="container" id="playerStatsLoader">
        {mapPlayerDetails()}
        <div className="row">
          {mapStats("1")}
          {mapStats("2")}
          {mapStats("3")}
          {mapStats("4")}
        </div>
      </div>
    </React.Fragment>
  );
};

export default PlayerStats;
