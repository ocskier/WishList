import React from "react";
import "./Search.css";

export const Search = ({ children }) => {
  return (
    <div className="list-overflow-container">
      <ul className="collection z-depth-3 center-align">
        {children}
      </ul>
    </div>
  );
};
