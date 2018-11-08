import React, { Component } from "react";

import {Collection,CollectionItem,Button} from "react-materialize";

import {Card} from "../../components/Card";

import API from "../../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
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
        console.log(res.data);
        this.setState({ userLocal: res.data})
        })
      .catch(err => console.log(err));

  addFriend = (e) => {
    e.preventDefault();
    let el = e.target.parentNode;
    console.log(el);
    API.updateUser({
      $push: {
        sharedlists: el.id
      }
    })
    .then(res => {
      console.log(res.data);
      this.setState({ userLocal: res.data})
      })
    .catch(err => console.log(err));
  }

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
                <Collection>
                  <CollectionItem>
                    <div className="row">
                      <div className="col s5">
                        <i className="material-icons left">poll</i> Name: </div>
                      <div className="col s7 right-align">{this.state.userLocal.firstName + " " + this.state.userLocal.lastName}</div>
                    </div>
                  </CollectionItem>
                  <CollectionItem>
                    <div className="row">
                      <div className="col s5">
                        <i className="material-icons left">domain</i> Lives in</div>
                      <div className="col s7 right-align">Raleigh-Durham, NC, USA</div>
                    </div>
                  </CollectionItem>
                  <p className="center" style={{width: "80%",margin:"5px auto 0",border:"2px solid"}}>My Lists</p>
                  <div style={{width:"80%",margin:"0 auto"}}>
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
                            <div className="right">
                              <Button onClick={this.addFriend} id={list._id} style={{marginRight:5}} floating className='green' waves='light'icon="add" />
                              <Button style={{marginLeft:5}} floating className='blue' waves='light' icon='share' />
                            </div>
                          </ListItem>
                        ))
                      }
                    </List>
                  </div>
                </Collection>
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
