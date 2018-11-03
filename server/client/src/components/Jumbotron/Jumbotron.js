import React from "react";

const Jumbotron = ({ children }) => (
  <div
    style={{ padding: "10px", clear: "both", textAlign: "center" }}
    className="jumbotron"
  >
    {children}
  </div>
);

export default Jumbotron;
