import React, { Component } from "react";
import {MediaBox} from 'react-materialize';

import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import Jumbotron from "../../components/Jumbotron";
import {List,ListItem} from "../../components/List";

import API from "../../utils/API";

class Gifts extends Component {

  state = {
    gifts: [{name:"Gift1",pic:<MediaBox style={{margin: "0 auto"}} width="150" height="150" border="0" src="//ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&MarketPlace=US&ASIN=B0773MLK5F&ServiceVersion=20070822&ID=AsinImage&WS=1&Format=_SL250_&tag=proj3team6-20"></MediaBox>,link:<div><a href="https://www.amazon.com/gp/product/B0773MLK5F/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=B0773MLK5F&linkCode=as2&tag=proj3team6-20&linkId=e4c3144365a5c7b44bfb29fd14d3fc61">Buy</a><img src="//ir-na.amazon-adsystem.com/e/ir?t=proj3team6-20&l=am2&o=1&a=B0773MLK5F" width="1" height="1" border="0" alt="" style={{border:"none !important", margin:"0px !important"}} /></div>}, 
    {name:"Gift2",link:<div><a   href="https://www.amazon.com/gp/product/B01EXWIBXS/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=B01EXWIBXS&linkCode=as2&tag=proj3team6-20&linkId=f198fb30a94596c5cf0fc32c6216a43f"><img width="150" alt="" height="150" border="0" src="//ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&MarketPlace=US&ASIN=B01EXWIBXS&ServiceVersion=20070822&ID=AsinImage&WS=1&Format=_SL250_&tag=proj3team6-20" /></a><img src="//ir-na.amazon-adsystem.com/e/ir?t=proj3team6-20&l=am2&o=1&a=B01EXWIBXS" width="1" height="1" border="0" alt="" style={{border:"none !important", margin:"0px !important"}} /></div>},
    {name:"Gift3",link:<div><a   href="https://www.amazon.com/gp/product/B074PY1M5G/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=B074PY1M5G&linkCode=as2&tag=proj3team6-20&linkId=602bbe02ff3b4ecca3160bf83e4f55ed"><img width="150" alt="" height="150" border="0" src="//ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&MarketPlace=US&ASIN=B074PY1M5G&ServiceVersion=20070822&ID=AsinImage&WS=1&Format=_SL250_&tag=proj3team6-20" /></a><img src="//ir-na.amazon-adsystem.com/e/ir?t=proj3team6-20&l=am2&o=1&a=B074PY1M5G" width="1" height="1" border="0" alt="" style={{border:"none !important", margin:"0px !important"}} /></div>}],
    listId: false
    // title: "",
    // author: "",
    // synopsis: ""
  };

  componentDidMount() { 
    !this.props.id ?
    // this.state.listId ?
    this.loadUserGifts() : 
    this.loadOtherGifts()
  }

  loadUserGifts = () => {
    // API.getUserGifts(this.props.user)
    //   .then(res =>
    //     this.setState({ gifts: res.data})
    //   )
    //   .catch(err => console.log(err));
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
                       {gift.pic}<br />
                       {gift.link}
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
