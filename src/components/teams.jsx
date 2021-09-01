import React from "react";
import Team from "./team";
import { useState, useEffect } from "react";
import axios from "axios";

const Teams = (props) => {
  const [teams, setTeam] = useState([]);
  const [chosen, setChosen] = useState("");
  const port = process.env.PORT || 3001;

  useEffect(() => {
    setChosen(props.teamChosen, chosen);
    getTeams();
  }, [props.teamChosen]);

  const getTeams = async () => {
    try {
      let res = await axios.get(`http://localhost:${port}/teams`);
      const teamsArray = JSON.parse(JSON.stringify(res.data));
      setTeam(teamsArray, teams);
    } catch (error) {
      console.log(error.daata);
    }
  };

  return (
    <React.Fragment>
      <div className="d-inline">
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
      </div>
    </React.Fragment>
  );
};

export default Teams;
