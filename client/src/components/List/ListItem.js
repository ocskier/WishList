import React from "react";

export const ListItem = props => (
  <li className="collection-item" id={props.id}>
    {props.children}
  </li>
);
