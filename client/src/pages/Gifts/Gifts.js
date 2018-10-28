import React, { Component } from "react";
import {Collapsible,CollapsibleItem,MediaBox,Input,Row as MatRow} from 'react-materialize';

import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import Jumbotron from "../../components/Jumbotron";
import {List,ListItem} from "../../components/List";
import {Card} from "../../components/Card";
import './Gifts.css'
import API from "../../utils/API";
import { inherits } from "util";

class Gifts extends Component {

  state = {
    gifts: [{giftName:"Gift1",pic:<MediaBox style={{margin: "0 auto"}} width="150" height="150" border="0" src="//ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&MarketPlace=US&ASIN=B0773MLK5F&ServiceVersion=20070822&ID=AsinImage&WS=1&Format=_SL250_&tag=proj3team6-20"></MediaBox>,link:<div><a target="_blank"  href="https://www.amazon.com/gp/product/B0773MLK5F/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=B0773MLK5F&linkCode=as2&tag=proj3team6-20&linkId=e4c3144365a5c7b44bfb29fd14d3fc61">Buy</a><img src="//ir-na.amazon-adsystem.com/e/ir?t=proj3team6-20&l=am2&o=1&a=B0773MLK5F" width="1" height="1" border="0" alt="" style={{border:"none !important", margin:"0px !important"}} /></div>}, 
    {giftName:"Gift2",link:<div><a target="_blank"  href="https://www.amazon.com/gp/product/B01EXWIBXS/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=B01EXWIBXS&linkCode=as2&tag=proj3team6-20&linkId=f198fb30a94596c5cf0fc32c6216a43f"><img width="150" height="150" border="0" src="//ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&MarketPlace=US&ASIN=B01EXWIBXS&ServiceVersion=20070822&ID=AsinImage&WS=1&Format=_SL250_&tag=proj3team6-20" /></a><img src="//ir-na.amazon-adsystem.com/e/ir?t=proj3team6-20&l=am2&o=1&a=B01EXWIBXS" width="1" height="1" border="0" alt="" style={{border:"none !important", margin:"0px !important"}} /></div>},
    {giftName:"Gift3",link:<div><a target="_blank"  href="https://www.amazon.com/gp/product/B074PY1M5G/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=B074PY1M5G&linkCode=as2&tag=proj3team6-20&linkId=602bbe02ff3b4ecca3160bf83e4f55ed"><img width="150" height="150" border="0" src="//ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&MarketPlace=US&ASIN=B074PY1M5G&ServiceVersion=20070822&ID=AsinImage&WS=1&Format=_SL250_&tag=proj3team6-20" /></a><img src="//ir-na.amazon-adsystem.com/e/ir?t=proj3team6-20&l=am2&o=1&a=B074PY1M5G" width="1" height="1" border="0" alt="" style={{border:"none !important", margin:"0px !important"}} /></div>}],
    userId: false,
    gift: "",
    price: "",
    descr:""
  };

  componentDidMount() { 
    console.log(this.props.user._id,this.props.id);
    (this.props.user._id === this.props.id) || !this.props.id ?
    // this.state.listId ?
    this.loadUserGifts() : 
    this.loadOtherGifts()
  }

  loadUserGifts = () => {
    API.getUserGifts(this.props.user._id)
      .then(res => 
        this.setState({ gifts: res.data},
          console.log(res))
      )
      .catch(err => console.log(err));
    this.setState({userId: true});
  };  

  loadOtherGifts = () => {
    API.getUserGifts(this.props.id)
      .then(res =>
        this.setState({gifts: res.data}, () => 
        console.log(this.state.gifts))
      )
      .catch(err => console.log(err));
  };

  addGift = (e) => {
    e.preventDefault();
    API.saveGift({
      giftName: this.state.gift,
      description: this.state.descr,
      price: this.state.price,
      wishlistId: this.props.user._id
    }).then((res) => {
      console.log(res);
      this.loadOtherGifts();
      this.setState({gift:"",price:"",descr:""})
    }).catch((err) => console.log(err));
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

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="m12">
          <div className="gift-jumbo container">
          <Jumbotron>
              <h3>Gifts on my List </h3>
            </Jumbotron>
          </div>            
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
