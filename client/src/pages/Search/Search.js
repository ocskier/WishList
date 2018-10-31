import React, { Component } from "react";

import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Col, Row, Container } from "../../components/Grid";
import { Search, SearchItem } from "../../components/Search";
import {Modal, Button} from 'react-materialize'
import './Search.css';


class Searches extends Component {
  state = {
    search: [{msg:"Search1"}],
    user: this.props.user,
    newsearchname: "*"
  };

  componentDidMount() {
    this.searchAll();
  }

  searchAll = () => {
    API.searchAll()
      .then(res =>
        this.setState({ search: res.data})
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

  // handleFormSubmit = event => {
  //   event.preventDefault();
  //   if (this.state.title && this.state.author) {
  //     API.saveBook({
  //       title: this.state.title,
  //       author: this.state.author,
  //       synopsis: this.state.synopsis
  //     })
  //       .then(res => this.loadBooks())
  //       .catch(err => console.log(err));
  //   }
  // };
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
            <div className="lists">
            <Search>
            {
                this.state.search.map(search => (
                    <SearchItem key={search.listing_id} id={search.listing_id}>
                      <Modal
                        header="Which wishlist?"
                        trigger={<Button className="float-right" onClick={this.saveButtonHandler}>Save</Button>}>
                        <p>{this.state.user.firstName + ' ' + this.state.user.lastName}</p>
                        </Modal> 
                      <br/>
                      <strong>
                      <a target="_blank" href={search.url}>{search.title}</a><br/>
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
