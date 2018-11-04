import React, { Component } from "react";
import {Card as MatCard,CardTitle,Collapsible,CollapsibleItem,Input,Row as MatRow} from 'react-materialize';
import Quagga from 'quagga';

import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import Jumbotron from "../../components/Jumbotron";
import {Card} from "../../components/Card";
import './Gifts.css'
import API from "../../utils/API";

const giftImg = "/rawpixel-1084229-unsplash.jpg";

class Gifts extends Component {

  state = {
    gifts: [],
    userId: false,
    gift: "",
    price: "",
    descr:"",
    wishlist:"",
    code:""
  };

  componentDidMount() { 
    console.log(this.props.user,this.props.id);
    API.getUser(this.props.user._id)
      .then(res => {
        console.log(res);
        !(this.props.id) || this.props.id===res.data.wishlists[0]._id ?  
          this.setState({userId: true, wishlist:res.data.wishlists[0]._id},
            () => this.getGifts(this.state.wishlist)) :
          this.setState({userId: false,wishlist:this.props.id},
            () => this.getGifts(this.state.wishlist))
        })
      .catch(err=>console.log(err))
  }

  getGifts = (id) => {
    API.getList(id)
    .then(res => {
      this.setState({gifts: res.data[0].gifts},
       () => console.log(this.state.gifts));
    })
    .catch(err => console.log(err))
  }

  addGift = (e) => {
    e.preventDefault();
    console.log(this.state);
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

  scanner = () => {
    Quagga.init({
    inputStream : {
      name : "Live",
      type : "LiveStream",
      target: document.querySelector('#scanner')    // Or '#yourElement' (optional)
    },
    decoder : {
      readers : ["code_128_reader"]
    }
    }, function(err) {
      if (err) {
          console.log(err);
          return
      }
      console.log("Initialization finished. Ready to start");
      Quagga.start();
      Quagga.onDetected((data) => {
        console.log("Detected");
        console.log(data.codeResult.code);
        this.setState({
          code: data.codeResult.code
        });
        console.log(data.codeResult.code);
      }
      )
    });
  }

  render() {
    return (
      <Container style={{paddingTop:"6rem"}} fluid>
        <Row>
          <Col size="m12">
          <div className="gift-jumbo container">
          <Jumbotron>
              <h3><span className="left emoji">🎁</span><span> Gift List </span><span className="right emoji">🎁</span></h3>
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
                    <Input onClick={this.scanner} id="scanner" s={12} label="UPC" />
                  </MatRow>
                </Card>
              </CollapsibleItem>
            </Collapsible>
          </Col> : null
        }
          <Col size="m8" style={{margin: "0 auto",flexGrow: 0,flexBasis: "auto"}}>
              { 
                this.state.gifts.map(item => (
                      <MatCard style={{marginBottom:"10px",flexDirection:"initial",width:"66%",height: 140}} horizontal className="small" header={<CardTitle style={{height:200,backgroundSize:"cover",backgroundPosition:"50%",backgroundClip:"content-box"}} image={giftImg} waves='light'></CardTitle>}>
                        <span style={{fontSize:20,width:"100%",background:"lightgrey",position:"absolute",top: 0,left:0,paddingLeft:15}}>{item.giftName}</span>
                        {this.state.userId ? <span style={{color:"crimson",position:"absolute",top: 0,right:0,paddingRight:5}} className="right">{item.status ==="Open" ? "Not Purchased!" : "Purchased"}</span> :null }
                        <br /><br />
                        <span style={{position:"absolute",bottom: 15,left:14}}>${item.price}</span>
                        <div style={{position:"absolute",bottom:12,right:12}} className="right">
                        {!this.state.userId ?
                             <Link to={item.status==="Open" ? "/giftdetail/" + item._id : "#"}>
                                <button className={item.status ==="Open" ? "btn-floating pulse" : "btn-floating black"} key={item._id} id={item._id} style={{width:"100%",fontSize:18,background:"red",borderRadius:"10px",padding:"0 5px",marginTop:"10px"}}>{item.status ==="Open" ? "Available to Buy!" : "Purchased"}
                                </button>
                             </Link>
                          :
                            <div>
                              {item.status ==="Open" ? <button style={{fontSize:18}} onClick={() => this.deleteGift(item._id)} >Delete Item</button> : null}
                            </div>
                        }
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
