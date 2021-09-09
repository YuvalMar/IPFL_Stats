import React from "react";
import Team from "./team";
import { useState, useEffect } from "react";
import axios from "axios";

const Teams = (props) => {
  const [teams, setTeam] = useState([]);
  const [chosen, setChosen] = useState("");

  useEffect(() => {
    setChosen(props.teamChosen, chosen);
    // Get all the teams data
    const getTeams = async () => {
      try {
        let res = await axios.get(`https://ipflserver.herokuapp.com/teams`);
        const teamsArray = JSON.parse(JSON.stringify(res.data));
        setTeam(teamsArray, teams);
      } catch (error) {
        console.log(error.daata);
      }
    };

    getTeams();
    // eslint-disable-next-line
  }, [props.teamChosen]);

  return (
    <React.Fragment>
      <div className="d-inline">
        <ul className="teamsList">
          {teams.map((teamCurr) => (
            <li key={teamCurr.name} className="teamListLogo">
              {" "}
              <Team
                isChoosed={teamCurr.teamID === props.teamChosen}
                img={teamCurr.picture}
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
