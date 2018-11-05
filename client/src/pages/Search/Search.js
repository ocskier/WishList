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
    price: '',
    description: '',
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

  saveButtonHandler = (data) => {
    console.log('clicked')
    const { wishlist, giftName, description, price } = data;
    console.log(data);
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

  bindState = (price, desc) => {
    this.setState({
      price: price,
      description: desc
    })
    console.log(this.state)
  }

  clickHandler = () => {
    console.log('you clicked me')
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
                    <SearchItem key={search.listing_id} id={search.listing_id} desc={search.url} price={search.price}>
                      <Modal
                        header='Please pick a wishlist,'
                        trigger={<Button onClick={this.clickHandler} price={search.price} desc={search.url} className="float-right">Save</Button>}>
                        <p>{this.state.user.firstName + ' ' + this.state.user.lastName}</p>
                        <List>
                          {this.state.wishlists.map(wishlist => (
                            <ListItem key={wishlist._id}>
                              {wishlist.name}
                              <SaveBtn id={wishlist._id} name={search.title} price={search.price} desc={search.url} click={() => this.saveButtonHandler({ wishlist: wishlist._id, giftName: search.title, price: search.price, description: search.url })}/>
                            </ListItem>
                          ))}
                        </List>
                        </Modal> 
                      <br/>
                      
                      <br></br>
                      <a target="_blank" href={search.url}>{search.title} </a><br/>
                      <p align="left" className="p"> {search.description} </p>
                    
                      <br/>
                          <div class="row">
                            <div class="col-md-6">
                              <em>
                                Ideas for:
                                  <br/>
                                    {search.category_path}
                                  <br/>
                              </em>
                            </div>
                            <div class = "col-md-6">
                              Price: {search.price} {search.currency_code}
                            </div>
                          </div>
                          
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