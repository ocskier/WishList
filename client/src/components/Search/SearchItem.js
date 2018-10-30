import React from "react";

export const SearchItem = props => (
  <li className="collection-item" id={props.id}>
    {props.children}
  </li>
);
