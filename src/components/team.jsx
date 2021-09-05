import React from "react";
import "../App.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const Team = (props) => {
  const [styleLogo, setStyle] = useState({ width: "80px", height: "80px" });
  useEffect(() => {
    if (props.isChoosed) {
      setStyle(
        {
          width: "80px",
          height: "80px",
          boxShadow: "0 0 7px #ccc",
          borderRadius: "55%",
          transform: "scale(1.5)",
        },
        styleLogo
      );
    } else setStyle({ width: "80px", height: "80px" }, styleLogo);
    // eslint-disable-next-line
  }, [props]);

  return (
    <React.Fragment>
      <Link to={`../players/${props.teamId}`}>
        <img
          className={props.isChoosed ? "" : "zoom"}
          src={props.img}
          alt={props.name}
          style={styleLogo}
        ></img>
      </Link>
    </React.Fragment>
  );
};

export default Team;
