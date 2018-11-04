import React from "react";
import "./FriendCard.css";

export const Card = (props) => (

  <div className="card">
    <div className="card-image" style={{maxHeight: "100%"}}>
      <img className="friendImg" style={{width: "100%",maxHeight: "280px",paddingTop: "40px",backgroundSize: "cover",backgroundPosition: "50%",backgroundClip: "content-box"}} alt={props.name} src={props.image} />
      <span className="card-title black-text" style={{top: 0,padding: "12px",width: "100%",textAlign: "center",fontSize:"1rem"}}>{props.title}</span>
    </div>
    <div className="card-content">
      {props.children}
    </div>
    <div className="card-action center">
      {props.link}
    </div>
  </div>
);

export default Card;
