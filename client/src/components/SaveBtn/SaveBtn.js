import React from "react";
import "./SaveBtn.css";

const SaveBtn = props => (
  <button
    onClick={props.onClick}
    className={`btn-sm btn-danger float-right ${props["data-value"]}`}
    {...props}
  />
);

export default SaveBtn;