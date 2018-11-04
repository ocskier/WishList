import React from "react";
import "./List.css";

export const List = ({ children }) => {
  return (
    <div className="list-overflow-container">
      <ul className="collection z-depth-3 center-align">
        {children}
      </ul>
    </div>
  );
};
