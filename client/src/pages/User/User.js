import React, { Component } from "react";

import {Card} from "../../components/Card";
// import DeleteBtn from "../../components/DeleteBtn";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import {Collapsible,CollapsibleItem,Input,Row as MatRow} from 'react-materialize';
import Moment from 'react-moment';

import './User.css';

class User extends Component {
  state = {
    userLocal: {wishlists:[]}
  };

  componentDidMount() {
    this.prepareLists();
  }

  prepareLists = () =>
    API.getUser(this.props.id)
      .then(res => {
        console.log(this.props.id);
        console.log(res.data);
        this.setState({ userLocal: res.data})
        })
      .catch(err => console.log(err));


  render() {
    return (
      <Container style={{paddingTop:"6rem"}} fluid>
        <Row>
          <Col size="m6">
          {/* <!--/ profile-page-header --> */}
          {/* <!-- profile-page-content --> */}
              {/* <!-- Profile About  --> */}
            <div className="about-me">
            <Card className="about-me" title="About Me!">
                <p className="center">Wanting a lot of electronics this season!</p>
                <List>
                  <ListItem>
                    <div className="row">
                      <div className="col s5">
                        <i className="material-icons left">poll</i> Name: </div>
                      <div className="col s7 right-align">{this.state.userLocal.firstName + " " + this.state.userLocal.lastName}</div>
                    </div>
                  </ListItem>
                  <ListItem>
                    <div className="row">
                      <div className="col s5">
                        <i className="material-icons left">domain</i> Lives in</div>
                      <div className="col s7 right-align">Raleigh-Durham, NC, USA</div>
                    </div>
                  </ListItem>
                  <p className="center" style={{width: "80%",margin:"5px auto 0",border:"2px solid"}}>My Lists</p>
                  <div style={{height:100,width:"80%",margin:"0 auto"}}>
                    <List>
                      {
                        this.state.userLocal.wishlists.map(list => (
                          <ListItem key={list._id} id={list._id}>
                            <i className="material-icons left">redeem</i>
                            <Link to={"/gifts/"+list._id}>
                              <strong>
                                {list.name}<br></br>
                                <Moment date={list.date} format="MM-DD-YYYY hh:mm" />
                              </strong>
                            </Link>
                          </ListItem>
                        ))
                      }
                    </List>
                  </div>
                </List>
            </Card>
            </div>
            {/* <!-- Profile About  --> */}
            {/* <!-- Profile About Details  --> */}
            
          </Col>
          
        </Row>
      </Container>
    );
  }
}

export default User;
