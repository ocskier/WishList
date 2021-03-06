import React, { Component } from "react";
import {Card as MatCard,CardTitle,Collapsible,CollapsibleItem,Input,Row as MatRow} from 'react-materialize';

import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import Jumbotron from "../../components/Jumbotron";
// import {List,ListItem} from "../../components/List";
import {Card} from "../../components/Card";
import './Gifts.css'
import API from "../../utils/API";

import Camera from '../../components/CameraApp/Camera';

const giftImg = "/rawpixel-1084229-unsplash.jpg";

class Gifts extends Component {

  state = {
    gifts: [],
    userId: false,
    scanning: false,
    gift: "",
    price: "",
    descr:"",
    wishlist:"",
    code:""
  };

  componentDidMount() { 
    console.log(this.props.user,this.props.id);
    API.getUser(this.props.user._id)
    .then((res) => {
      console.log(res);
      const userId = res.data._id;
      API.getList(this.props.id ? this.props.id : res.data.wishlists[res.data.wishlists.length-1]._id)
      .then(res => {
        console.log(res);  
        this.setState({
          userId: !(this.props.id) || userId===res.data.user._id ? true : false, 
          wishlist: res.data._id, 
          gifts: res.data.gifts})
        })
      .catch(err=>console.log(err))
      })
    .catch((err) => {console.log(err)})
  }

  getGifts = (id) => {
    API.getList(id)
    .then(res => {
      this.setState({gifts: res.data.gifts},
       () => console.log(this.state.gifts));
    })
    .catch(err => console.log(err))
  }
  
  addGift = (e) => {
    e.preventDefault();
    console.log(this.state);
    !(this.state.code === "") ?
    API.searchEAN(this.state.code)
    .then((res) => {
      console.log(res);
      API.saveGift({
        giftName: res.data.products[0].product_name,
        description: res.data.products[0].description,
        pic: res.data.products[0].images[0],
        manufacturer: res.data.products[0].manufacturer,
        model: res.data.products[0].model,
        mpn: res.data.products[0].mpn,
        wishlist: this.state.wishlist,
        code: res.data.products[0].barcode_number
      }).then((res) => {
        console.log(res);
        this.setState({
                gift: "",
                price: "",
                descr: ""
        },
        this.getGifts(this.state.wishlist));
      })
      .catch((err) => console.log(err));
    })
    .catch((err) => {
      console.log(err)
    }) :
    API.saveGift({
        giftName: this.state.gift,
        description: this.state.descr,
        price: this.state.price,
        wishlist: this.state.wishlist
      }).then((res) => {
        console.log(res);
        this.setState({
                gift: "",
                price: "",
                descr: ""
        },
        this.getGifts(this.state.wishlist));
      })
      .catch((err) => console.log(err));
  }

  deleteGift = id => {
    API.deleteGift(id)
      .then(res => {
        this.getUserGifts()
      })
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name , value } = event.target;
    this.setState({
      [name]: value
    },console.log(this.state));
  };

  _scan = () => {
      this.setState({scanning: !this.state.scanning});
  }

  scanner = (result) => {
    this.setState({code:result})
  }

  render() {
    return (
      <Container style={{paddingTop:"6rem"}} fluid>
        <Row>
          <Col size="m12">
          <div className="gift-jumbo container">
          <Jumbotron>
              <h3><span role="img" aria-label="gift" className="left emoji">🎁</span><span> Gift List </span><span role="img" aria-label="gift" className="right emoji">🎁</span></h3>
            </Jumbotron>
          </div>            
          </Col>
        </Row>
        <Row>
        {this.state.userId ?
          <Col size="s12 l4">
            <Collapsible popout defaultActiveKey={1}>
              <CollapsibleItem header='Add A Gift' icon='filter_drama'>
                <Card link={<button onClick={this.addGift} className="btn green waves-effect waves-light" type="submit" name="action">
                  <i style={{marginLeft:0}} className="material-icons right">add</i></button>}>
                  <MatRow style={{flex:"none",display: "block"}}>
                    <Input onChange={this.handleInputChange} style={{fontWeight:"bold"}} s={6} label="Gift Name" value={this.state.gift} name="gift" />
                    <Input onChange={this.handleInputChange} s={6} label="Price" value={this.state.price} name="price" />
                    <Input onChange={this.handleInputChange} s={12} label="Description" value={this.state.descr} name="descr" />
                    <button className="btn btn-large" onClick={this._scan}>{this.state.scanning ? 'Click When Done' : 'Scan a Barcode'}</button>
                    <br /><br />
                    <Input type="text" onChange={this.handleInputChange} s={12} label="UPC: " value={this.state.code} name="code" />
            
                  </MatRow>
                </Card>
              </CollapsibleItem>
            </Collapsible>
          </Col> : null
        }
          <Col size="s12 l8" style={{margin: "0 auto",flexGrow: 0,flexBasis: "auto"}}>
              <Camera scanning={this.state.scanning} scanner={this.scanner.bind(this)} />
              { 
                this.state.gifts.map(item => (
                      <MatCard  
                        key={item._id} 
                        style={{marginBottom:"10px",flexDirection:"initial",width:"66%",height: 140}} 
                        horizontal className="small mycard" 
                        header={
                          <CardTitle style={{height:200,backgroundSize:"cover",backgroundPosition:"50%",backgroundClip:"content-box"}} 
                            image={item.pic ? item.pic : giftImg} 
                            waves='light'>
                          </CardTitle>}>
                          <span style={{fontSize:20,width:"100%",background:"lightgrey",position:"absolute",top: 0,left:0,paddingLeft:15}}>{item.giftName}</span>
                          {this.state.userId ? 
                            <span style={{color:"crimson",position:"absolute",top: 0,right:0,paddingRight:5}} 
                                  className="right">{item.status ==="Open" ? "Not Purchased!" : "Purchased"}</span>
                          :null }
                          <br /><br />
                          <span style={{position:"absolute",bottom: 15,left:14}}>${item.price}</span>
                          <div style={{position:"absolute",bottom:12,right:12}} className="right">
                            {!this.state.userId ?
                              <Link to={item.status==="Open" ? "/giftdetail/" + item._id : "#"}>
                                  <button className={item.status ==="Open" ? "btn-floating pulse" : "btn-floating black"} 
                                    id={item._id} 
                                    style={{width:"100%",fontSize:18,background:"red",borderRadius:"10px",padding:"0 5px",marginTop:"10px"}}>
                                      {item.status ==="Open" ? "Available to Buy!" : "Purchased"}
                                  </button>
                              </Link>
                            :
                              <div>
                                {item.status ==="Open" ? 
                                  <button style={{fontSize:18}} onClick={() => this.deleteGift(item._id)} >
                                    Delete Item
                                  </button> 
                                : null}
                              </div> }
                          </div>
                        {/* <MediaBox style={{margin: "0 auto"}} width="150" height="150" border="0" src="//ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&MarketPlace=US&ASIN=B0773MLK5F&ServiceVersion=20070822&ID=AsinImage&WS=1&Format=_SL250_&tag=proj3team6-20"></MediaBox><div className="center"><a target="_blank"  href="https://www.amazon.com/gp/product/B0773MLK5F/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=B0773MLK5F&linkCode=as2&tag=proj3team6-20&linkId=e4c3144365a5c7b44bfb29fd14d3fc61">Buy</a><img src="//ir-na.amazon-adsystem.com/e/ir?t=proj3team6-20&l=am2&o=1&a=B0773MLK5F" width="1" height="1" border="0" alt="" style={{border:"none !important", margin:"0px !important"}} /></div> */}
                      </MatCard>
                ))
              }
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Gifts;
