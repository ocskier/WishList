import React from "react";

export const Row = ({ fluid, children,style }) => (
  <div style={style} className={`row${fluid ? "-fluid" : ""}`}>
    {children}
  </div>
);
