import React from "react";

export const Col = ({ id,size,children,style }) => (
  <div id={id} style={style} className={"col "+ size.split(" ").map(size => size).join(" ")}>
    {children}
  </div>
);
