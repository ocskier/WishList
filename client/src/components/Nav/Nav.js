import React, { Fragment } from "react";
import { Link } from 'react-router-dom';

import './Nav.css';

const Nav = (props) => {
  let greeting;

  if (props.user === null) {
		greeting = <p>Hello guest</p>
	} else if (props.user.firstName) {
		greeting = (
			<Fragment>
				Welcome back, <strong>{props.user.firstName}</strong>
			</Fragment>
		)
	} else if (props.user.username) {
		greeting = (
			<Fragment>
				Welcome back, <strong>{props.user.username}</strong>
			</Fragment>
		)
  }
  


  return (
    <nav style={{height: "120px",padding: "25px 20px 0 20px"}}>
      <div className="nav-wrapper" style={StyleSheet.header}>
          <ul className="left">
              <li style={{display: "grid",paddingRight:"10px"}}>
              <Link to="/">Home</Link>
              </li>
          </ul>
          <p className="brand-logo center" style={{fontSize: "4rem"}}>{props.children}</p>
          <ul className="right" style={{display: "grid",lineHeight: "35px"}}>
            <li>
              {greeting}
            </li>
            <li>
              <Link to="#" className="logout" onClick={props.logout}>Logout</Link>
            </li>
          </ul>
      </div>
    </nav>
  )
};

export default Nav;
