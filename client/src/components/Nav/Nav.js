import React, { Fragment } from "react";
import { Link } from 'react-router-dom';

import {Chip,SideNav,SideNavItem} from 'react-materialize';

import './Nav.css';

const urlBack = '/Images/home.jpg';

const Nav = (props) => {
  let greeting;

  if (props.user === null) {
		greeting = <p>Hello guest</p>
	} else if (props.user.firstName) {
		greeting = (
			<Fragment>
				<Chip>
        <img src={props.user.imgUrl} alt='Contact Person' />
        <strong style={{fontWeight:900}}>{props.user.firstName}</strong>
        </Chip>
			</Fragment>
		)
	} else if (props.user.username) {
		greeting = (
			<Fragment>
				Welcome back, <strong>{props.user.username}</strong>
			</Fragment>
		)
  }
  const fullName =  props.user.firstName + " " + props.user.lastName;

  return (
    <nav style={{height: "120px",padding: "25px 20px 0 20px", backgroundColor: 'red'}}>
      <div className="nav-wrapper" style={StyleSheet.header}>
          <SideNav trigger={<i className="material-icons left" style={{color:"white",marginLeft:40}}>menu</i>} options={{ closeOnClick: true }}>
							<SideNavItem userView
								user={{
										background: urlBack,
										image: props.user.imgUrl,
										name: fullName,
										email: props.user.email
                }}
							/>
              <SideNavItem waves icon='home'><Link to="/" style={{fontSize: "2rem", textShadow: "2px 2px 5px #000000"}}>Home</Link></SideNavItem>
              <SideNavItem waves icon='person'><Link to="/lists" style={{fontSize: "2rem", textShadow: "2px 2px #000000"}}>Lists</Link></SideNavItem>
					</SideNav>
          <p className="brand-logo center" style={{fontSize: "6rem", textShadow: "3px 3px 5px #000000"}}>{props.children}</p>
          <ul className="right" style={{display: "grid",lineHeight: "35px"}}>
            <li className="center">
              {greeting}
            </li>
            <li>
              <Link to="#" className="logout" onClick={props.logout} style={{fontSize: "2rem", textShadow: "2px 2px 5px #000000"}}>Logout</Link>
            </li>
          </ul>
      </div>
    </nav>
  )
};

export default Nav;
