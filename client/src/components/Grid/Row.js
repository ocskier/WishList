import React from "react";

export const Row = ({ fluid, children }) => (
  <div style={{marginTop: "40px"}} className={`row${fluid ? "-fluid" : ""}`}>
    {children}
  </div>
);
