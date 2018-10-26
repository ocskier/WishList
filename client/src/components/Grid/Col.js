import React from "react";

export const Col = ({ size,children,style }) => (
  <div style={style} className={"col "+ size.split(" ").map(size => size).join(" ")}>
    {children}
  </div>
);
