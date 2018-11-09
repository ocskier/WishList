import React, { Component } from "react";

import {Input,Row as MatRow} from 'react-materialize';

import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Col, Row, Container } from "../../components/Grid";
import { Search, SearchItem } from "../../components/Search";

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
    let query = "";
    const firstName = this.state.firstName;
    const lastName = this.state.lastName;
    const username = this.state.username;
    query = firstName + lastName + username === "" ? '' : '?';
    query = firstName === "" ? query : query+ "firstName=" + firstName;
    query = (firstName !== "") && (lastName + username !== "") ? query + '&': query;
    query = lastName === "" ? query : query+ "lastName=" + lastName;
    query = (username !== "") && (lastName + firstName !== "") ? query + '&': query;
    query = username === "" ? query : query+ "username=" + username;

    console.log(query);

    API.searchUsers(query)
      .then(res => {
        this.removeUser(res.data,(list) => 
          this.setState({ users: list})
        )
      }
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

  removeUser = (list,callback) => {
    let filteredList = list;
    filteredList = this.filterList(filteredList,this.state.user._id);
    callback(filteredList);
  }

  filterList = (mylist,id) => {
    return mylist.filter(list=>!(list._id===id))
  }

  // saveButtonHandler = () => {
  //   console.log('clicked')
  //   console.log(this.props.user)
  // }

  render() {
    return (
      <Container style={{paddingTop:"6rem"}} fluid>
        <Row>
          <Col size="m6 s12">
            <div className="list-gifts">
            <Jumbotron>
              <h4>Search for a Friend!</h4>
            </Jumbotron>
            </div>
            <Card link={<button onClick={this.search} className="btn green waves-effect waves-light" type="submit" name="action">
              Search</button>}>
              <MatRow style={{flex:"none",display: "block"}}>
                <Input onChange={this.handleInputChange} style={{fontWeight:"bold"}} s={6} label="First Name" defaultValue={this.state.gift} name="firstName" />
                <Input onChange={this.handleInputChange} s={6} label="Last Name" defaultValue={this.state.price} name="lastName" />
                <Input onChange={this.handleInputChange} s={12} label="Username" defaultValue={this.state.descr} name="username" />
              </MatRow>
            </Card>            
            <div className="lists">
            <Search>
            {
                this.state.users.map(user => (
                    <SearchItem key={user._id} id={user._id}>
                      
                      <br/>
                      <strong>
                        <Link to={"/users/" + user._id}>{user.firstName + ' '+ user.lastName}</Link><br/>
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

export default SearchUser;
