import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import Jumbotron from "../../components/Jumbotron";
import {List,ListItem} from "../../components/List";

import API from "../../utils/API";

class Gifts extends Component {

  state = {
    gifts: [{msg:"Gift1"},{msg:"Gift2"},{msg:"Gift3"}],
    userGifts: false
    // title: "",
    // author: "",
    // synopsis: ""
  };

  componentDidMount() {
    this.state.userGifts === true ?
    this.loadUserGifts() : 
    this.loadOtherGifts()
  }

  loadUserGifts = () => {
    API.getUserGifts(this.props.user)
      .then(res =>
        this.setState({ gifts: res.data})
      )
      .catch(err => console.log(err));
  };  

  loadOtherGifts = () => {
    API.getOtherGifts()
      .then(res =>
        this.setState({gifts: res.data}, () => 
        console.log(this.state.gifts))
      )
      .catch(err => console.log(err));
  };

  // deletegift = id => {
  //   API.deletegift(id)
  //     .then(res => this.loadgifts())
  //     .catch(err => console.log(err));
  // };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="m12">
            <Jumbotron>
              <strong style={{fontSize:"2rem"}}> Gifts on the List </strong>
            </Jumbotron>
          </Col>
        </Row>
        <Row>
          <Col size="m8" style={{margin: "0 auto",flexGrow: 0,flexBasis: "auto"}}>
          <List> {
                this.state.gifts.map(gift => (
                    <ListItem key={gift._id} id={gift._id}>
                      <strong>
                       <Link to={"/giftdetail/"}>{gift.name}</Link>
                      </strong>
                    </ListItem>
                  ))
                }
              </List>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Gifts;
