import React from "react";

import "./style.css";
import spotify from "../../assets/img/circle.svg";
function Loading() {
  return (
    <div className="loading_wrapper">
      <div className="loading_container">
      <img src={spotify} alt="spotify" />
      </div>
    </div>
  );
}

export default Loading;
