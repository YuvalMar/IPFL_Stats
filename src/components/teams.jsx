import React from "react";
import Team from "./team";
import { useState, useEffect } from "react";
import axios from "axios";
import teamsArray from "../data/teamsDataTry";
import playersArray from "../data/playersData";

const Teams = (props) => {
  const [teams, setTeam] = useState([]);
  const [chosen, setChosen] = useState("");

  useEffect(() => {
    setChosen(props.teamChosen, chosen);
    getTeams();
  }, [props.teamChosen]);

  const getTeams = async () => {
    try {
      let res = await axios.get("http://localhost:3001/teams");
      const teamsArray = JSON.parse(JSON.stringify(res.data));
      setTeam(teamsArray, teams);
    } catch (error) {
      console.log(error.daata);
    }
  };

  return (
    <ul className="teamsList">
      {teams.map((teamCurr) => (
        <li className="teamListLogo">
          {" "}
          <Team
            isChoosed={teamCurr.teamID == props.teamChosen}
            img={teamCurr.picture}
            key={teamCurr.name}
            name={teamCurr.name}
            teamId={teamCurr.teamID}
          ></Team>{" "}
        </li>
      ))}
    </ul>
  );
};

export default Teams;
