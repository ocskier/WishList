import React, { Component } from "react";
import {Collapsible,CollapsibleItem,Input,Row as MatRow} from 'react-materialize';

import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import Jumbotron from "../../components/Jumbotron";
import {List,ListItem} from "../../components/List";
import {Card} from "../../components/Card";

import API from "../../utils/API";
import { inherits } from "util";

class Gifts extends Component {

  state = {
    gifts: [],
    userId: false,
    gift: "",
    price: "",
    descr:"",
    listid:"",
  };

  componentDidMount() { 
    console.log(this.props.user._id,this.props.id);
    (this.props.user._id === this.props.id) || !this.props.id ?
    // this.state.listId ?
    this.setState({userId: true},this.loadUserGifts()) : 
    this.loadOtherGifts()
  }

  loadUserGifts = () => {
    this.getGifts(this.props.user._id);
  };  

  loadOtherGifts = () => {
    this.getGifts(this.props.id);
  };

  getGifts = (id) => {
    API.getUserGifts(id)
      .then(res =>
        this.setState({gifts: res.data[0].gifts,listid:res.data[0]._id},
         () => 
        console.log(this.state.gifts))
      )
      .catch(err => console.log(err));
  }

  addGift = (e) => {
    e.preventDefault();
    API.saveGift({
        giftName: this.state.gift,
        description: this.state.descr,
        price: this.state.price,
        wishlistId: this.state.listid
      }).then((res) => {
        console.log(res);
        this.addToList(res);
      })
      .catch((err) => console.log(err));
  }

  // deletegift = id => {
  //   API.deletegift(id)
  //     .then(res => this.loadgifts())
  //     .catch(err => console.log(err));
  // };

  handleInputChange = event => {
    const { name , value } = event.target;
    this.setState({
      [name]: value
    },console.log(this.state));
  };

  addToList(res) {
    API.updateList(this.state.listid, {
      $push: {
        gifts: res.data._id
      }
    }).then((res) => {
      this.loadUserGifts();
      this.setState({
        gift: "",
        price: "",
        descr: ""
      });
    }).catch((err) => console.log(err));
  }

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
        {this.state.userId ?
          <Col size="m4">
            <Collapsible popout defaultActiveKey={1}>
              <CollapsibleItem header='Add A Gift' icon='filter_drama'>
                <Card link={<button onClick={this.addGift} className="btn green waves-effect waves-light" type="submit" name="action">
                  <i style={{marginLeft:0}} className="material-icons right">add</i></button>}>
                  <MatRow style={{flex:"none",display: "block"}}>
                    <Input onChange={this.handleInputChange} style={{fontWeight:"bold"}} s={6} label="Gift Name" value={this.state.gift} name="gift" />
                    <Input onChange={this.handleInputChange} s={6} label="Price" value={this.state.price} name="price" />
                    <Input onChange={this.handleInputChange} s={12} label="Description" value={this.state.descr} name="descr" />
                    <Input s={12} label="UPC" />
                  </MatRow>
                </Card>
              </CollapsibleItem>
            </Collapsible>
          </Col> : null
        }
          <Col size="m8" style={{margin: "0 auto",flexGrow: 0,flexBasis: "auto"}}>
          <List> {
                this.state.gifts.map(gift => (
                    <ListItem key={gift._id} id={gift._id}>
                      <strong>
                       <Link to={"/giftdetail/"}>{gift.giftName}</Link><br />
                       {gift.description}<br />
                       {gift.price}<br />
                       {gift.status}
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
