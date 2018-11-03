import React, { Component } from "react";

import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Col, Row, Container } from "../../components/Grid";
import { Search, SearchItem } from "../../components/Search";
import {Modal, Button} from 'react-materialize'
import {Card} from "../../components/Card";
import { Link } from "react-router-dom";
import './SearchUser.css';


class SearchUser extends Component {
  state = {
    users: [],
    user: this.props.user,
    firstName: "",
    lastName: "",
    username: ""
  };

  componentDidMount() {
    this.search();

  }

  search = () => {
    let query = "?";
    query = firstName === "" ? query : query+ "firstName=" + firstName;
    query = lastName === "" ? query : query+ "lastName=" + lastName;
    query = username === "" ? query : query+ "username=" + username;

    API.searchUsers()
      .then(res =>
        this.setState({ users: res.data})
      )
      .catch(err => console.log(err));
  };

  deleteList = id => {
    API.deleteList(id)
      .then(res => this.loadLists())
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  addList = (e) => {
    e.preventDefault();
    API.makeList({
      user: this.props.user.username,
      userId: this.props.user._id, 
      name: this.state.newlistname
    }).then((res) => {
        console.log(res);
        this.setState({
          newlistname: ""
        });
        this.loadLists();
      })
      .catch((err) => console.log(err));
  }

  saveButtonHandler = () => {
    console.log('clicked')
    console.log(this.props.user)
  }

  render() {
    return (
      <Container style={{paddingTop:"6rem"}} fluid>
        <Row>
          <Col size="m6 s12">
            <div className="list-gifts">
            <Jumbotron>
              <h4>Suggestions</h4>
            </Jumbotron>
            </div>
            <Card link={<button onClick={this.addGift} className="btn green waves-effect waves-light" type="submit" name="action">
              <i style={{marginLeft:0}} className="material-icons right">add</i></button>}>
              <MatRow style={{flex:"none",display: "block"}}>
                <Input onChange={this.handleInputChange} style={{fontWeight:"bold"}} s={6} label="First Name" value={this.state.gift} name="firstName" />
                <Input onChange={this.handleInputChange} s={6} label="Last Name" value={this.state.price} name="lastName" />
                <Input onChange={this.handleInputChange} s={12} label="Username" value={this.state.descr} name="username" />
              </MatRow>
            </Card>            
            <div className="lists">
            <Search>
            {
                this.state.users.map(user => (
                    <SearchItem key={user._id} id={user._id}>
                      
                      <br/>
                      <strong>
                      <a target="_blank" href={"/users/" + user._id}>{user.firstName + ' '+ user.lasName}</a><br/>
                      </strong>
                    </SearchItem>
                  ))
                }
            </Search>
            </div>
            
            
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Searches;
