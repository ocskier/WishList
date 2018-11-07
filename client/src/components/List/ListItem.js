import React from "react";

export const ListItem = props => (
  <li style={{justifyContent:"space-around"}} className="collection-item valign-wrapper" id={props.id}>
    {props.children}
  </li>
);
