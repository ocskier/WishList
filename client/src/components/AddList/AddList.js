import React from "react";
import "./AddList.css";

// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually
const AddList = props => (
  <span className="btn btn-primary" {...props}>
    Add a Wishlist
  </span>
);

export default AddList;
