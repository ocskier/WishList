import React, { Component } from "react";

import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Col, Row, Container } from "../../components/Grid";
import { Search, SearchItem } from "../../components/Search";
import {Modal, Button} from 'react-materialize';
import {List, ListItem} from '../../components/List';
import SaveBtn from '../../components/SaveBtn'
import './Search.css';

//let user = []

class Searches extends Component {
  state = {
    search: [{msg:"Search1"}],
    user: this.props.user,
    newsearchname: "*",
    wishlists: []
  };

  componentDidMount() {
    this.searchAll();
    API.getUser(this.props.user._id).then(response => {
      console.log(response.data.wishlists)
      //user.push(response.data.wishlists)
      this.setState({
        wishlists: response.data.wishlists
      })
      console.log(this.state)
    })
  
  }

  searchAll = () => {
    API.searchAll()
      .then(res => {
        console.log(res);
        this.setState({ search: res.data});
      })
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

  saveButtonHandler = (event) => {
    console.log('clicked')
    const wishlist = event.target.id
    const giftName = event.target.name
    const description = event.target.desc
    const price = event.target.price
    API.saveGift({
      wishlist: wishlist,
      giftName: giftName,
      description: description,
      price: price,
    })
    .then(res => {
      console.log(res)
    }) 
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
                        header='Please pick a wishlist,'
                        trigger={<Button className="float-right">Save</Button>}>
                        <p>{this.state.user.firstName + ' ' + this.state.user.lastName}</p>
                        <List>
                          {this.state.wishlists.map(wishlist => (
                            <ListItem key={wishlist._id}>
                              {wishlist.name}
                              <SaveBtn id={wishlist._id} name={search.title} price={search.price} desc={search.url} click={this.saveButtonHandler.bind(this)}/>
                            </ListItem>
                          ))}
                        </List>
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
