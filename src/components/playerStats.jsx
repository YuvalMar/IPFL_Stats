import React from "react";
import { useState, useEffect } from "react";
import Teams from "./teams";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDoubleRight } from "@fortawesome/fontawesome-free-solid";
import { faShieldAlt } from "@fortawesome/fontawesome-free-solid";
import { faChartLine } from "@fortawesome/fontawesome-free-solid";
import { faHandsHelping } from "@fortawesome/fontawesome-free-solid";
import axios from "axios";

// Playerstats component
const PlayerStats = ({ match }) => {
  const [playerstats, setPlayerStats] = useState([]);
  const [color, setColor] = useState("");

  useEffect(() => {
    getPlayerStats(match.params.id);
    // eslint-disable-next-line
  }, [match.params.id]);

  // Get the relevant player data based on his Id
  const getPlayerStats = async (id) => {
    try {
      let res = await axios.get(
        `https://ipflserver.herokuapp.com/playerStats/${id}`
      );
      const playStatsArray = JSON.parse(JSON.stringify(res.data));
      setPlayerStats(playStatsArray, playerstats);
      getTeamColor(playStatsArray.teamId);
    } catch (error) {
      console.log(error.data);
    }
  };
  // Get the relevant team color based on the teamId
  const getTeamColor = async (id) => {
    try {
      let res = await axios.get(`https://ipflserver.herokuapp.com/teams/${id}`);
      const data = JSON.parse(JSON.stringify(res.data));
      setColor(
        data.map((Team) => Team.color),
        color
      );
    } catch (error) {
      console.log(error.daata);
    }
  };

  // Map only the relevant keys
  const keysMapping = (type) => {
    const keys = Object.keys(playerstats).filter(
      (key) => key !== "img" && key !== "id" && key !== "teamId"
    );
    const zerokeys = keys.filter((key) => key.includes(type));
    return zerokeys;
  };

  //Map the stats to four cards
  // 1- Regular Numbers stats 2-Passing stats 3-Attacking stats 4-Defensive stats
  const mapStats = (type) => {
    let iconString;
    let header;
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
      default:
        break;
    }
    return (
      <div className="col-sm-3">
        <div className="playerstats_container">
          <div className="playerstat_container">
            <div className="playerstat__details">
              <div className="playerstat__content" id={`boxShadowCard${color}`}>
                <div>
                  <FontAwesomeIcon icon={iconString} />
                </div>
                <h3 className="playerstat_header">{header}</h3>
                {keysMapping(type).map((key) => (
                  <div key={key}>
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

  // Map the player details
  const mapPlayerDetails = () => {
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
        <div className="container">
          <div className="row">
            {mapStats("1")}
            {mapStats("2")}
            {mapStats("3")}
            {mapStats("4")}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default PlayerStats;
