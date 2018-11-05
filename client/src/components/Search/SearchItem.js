import React from "react";

export const SearchItem = props => (
  <li className="collection-item" id={props.id} desc={props.desc} price={props.price}>
    {props.children}
  </li>
);
