import React, { Component } from "react";
import Postscribe from "postscribe";

// import DeleteBtn from "../../components/DeleteBtn";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
// import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
// import { List, ListItem } from "../../components/List";
// import {Card} from "../../components/Card";
import {Card as MatCard,CardTitle} from 'react-materialize';
// import {MediaBox} from "react-materialize";

import "./GiftDetail.css";
const giftImg = "/rawpixel-1084229-unsplash.jpg";

class GiftDetail extends Component {
  state = {
    userId: false,
    gift: {},
    searchResults: []
  };

  componentDidMount() {
    console.log(this.props.giftid);
    API.getGift(this.props.giftid)
       .then(res => {
        console.log(res);
        this.setState({gift: res.data},
         () => {
         console.log(this.state.gift.description);
         this.searchAuction();
         const searchScript1 = '<script type="text/javascript">amzn_assoc_placement = "adunit0";amzn_assoc_tracking_id = "proj3team6-20";amzn_assoc_ad_mode = "search";amzn_assoc_ad_type = "smart";amzn_assoc_marketplace = "amazon";amzn_assoc_region = "US";amzn_assoc_title = "Shop Related Products";amzn_assoc_default_search_phrase = "'+this.state.gift.description+'";amzn_assoc_default_category = "All";amzn_assoc_linkid = "d3d3fe6c790f6d1bac8a0025e3a0d068";amzn_assoc_rows = "6";amzn_assoc_design = "text_links";</script><script src="//z-na.amazon-adsystem.com/widgets/onejs?MarketPlace=US"></script>';
         const searchScript2 = '<script type="text/javascript">amzn_assoc_placement = "adunit0";amzn_assoc_tracking_id = "proj3team6-20";amzn_assoc_ad_mode = "search";amzn_assoc_ad_type = "smart";amzn_assoc_marketplace = "amazon";amzn_assoc_region = "US";amzn_assoc_title = "Shop Related Products";amzn_assoc_default_search_phrase = "'+this.state.gift.description+'";amzn_assoc_default_category = "All";amzn_assoc_linkid = "344c640cdfb4c82421aedd0a562c76db";amzn_assoc_search_bar = "true";amzn_assoc_search_bar_position = "top";</script><script src="//z-na.amazon-adsystem.com/widgets/onejs?MarketPlace=US"></script>';
         Postscribe('#adSearchText',searchScript1);
         Postscribe('#adSearchPics',searchScript2); 
        })
       })
       .catch(err => console.log(err))
    Postscribe('#adDivBottom', '<div style="text-align: -webkit-center" className="aligncenter"><script type="text/javascript">amzn_assoc_ad_type = "banner";amzn_assoc_marketplace = "amazon";amzn_assoc_region = "US";amzn_assoc_placement = "assoc_banner_placement_default";amzn_assoc_campaigns = "gift_certificates";amzn_assoc_banner_type = "category";amzn_assoc_isresponsive = "true";amzn_assoc_banner_id = "1G274HKHXM7QERC7YAG2";amzn_assoc_tracking_id = "proj3team6-20";amzn_assoc_linkid = "00082d8280273b37a749e37f6b30f4c6";</script><script src="//z-na.amazon-adsystem.com/widgets/q?ServiceVersion=20070822&Operation=GetScript&ID=OneJS&WS=1"></script></div>');
    Postscribe('#adDivLeft','<div class="alignleft"><script type="text/javascript">amzn_assoc_ad_type = "banner";amzn_assoc_marketplace = "amazon";amzn_assoc_region = "US";amzn_assoc_placement = "assoc_banner_placement_default";amzn_assoc_banner_type = "ez";amzn_assoc_p = "11";amzn_assoc_width = "160";amzn_assoc_height = "600";amzn_assoc_tracking_id = "proj3team6-20";amzn_assoc_linkid = "68f180d7e777c773cf1d5eaf562b6036";</script><script src="//z-na.amazon-adsystem.com/widgets/q?ServiceVersion=20070822&Operation=GetScript&ID=OneJS&WS=1"></script></div>');
    Postscribe('#adDivRight','<div class="alignleft"><script type="text/javascript">amzn_assoc_ad_type = "banner";amzn_assoc_marketplace = "amazon";amzn_assoc_region = "US";amzn_assoc_placement = "assoc_banner_placement_default";amzn_assoc_campaigns = "amazonhomepage";amzn_assoc_banner_type = "rotating";amzn_assoc_p = "29";amzn_assoc_width = "160";amzn_assoc_height = "600";amzn_assoc_tracking_id = "proj3team6-20";amzn_assoc_linkid = "a3e6a319a4d30945a4070fbcd67eb2ba";</script><script src="//z-na.amazon-adsystem.com/widgets/q?ServiceVersion=20070822&Operation=GetScript&ID=OneJS&WS=1"></script></div>');
  }

  loadGift = () => {
    API.getBooks()
      .then(res =>
        this.setState({ books: res.data, title: "", author: "", synopsis: "" })
      )
      .catch(err => console.log(err));
  };

  buyGift = () => {
    console.log(this.props.giftid);
    API.updateGift(this.props.giftid,{status: "Purchased"})
      .then(res=> {
        window.location.assign('/lists');
        console.log(res);
      })
      .catch(err => console.log(err));
  };

  searchAuction = () => {
    API.searchEbay(this.state.gift.description[5] === ":" ? this.state.gift.description : null)
      .then(res=> {
        console.log(res);
        this.setState({searchResults: res.data.findItemsByKeywordsResponse[0].searchResult[0].item});
      })
      .catch(err => console.log(err));
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  render() {
    return (
      <Container style={{paddingTop:"6rem"}} fluid>
        <Row>
          <Col size="s12">
          <div className="gift-jumbo">
            <Jumbotron>
              <h3>Buy A Gift</h3>
            </Jumbotron>
          </div>
          </Col>
        </Row>
        <Row>
          <Col size="s12 m2">
            <div id="adDivLeft"></div>
          </Col>
          <Col style={{margin:"0 auto",flex:"none"}} size="s12 m8">
              <MatCard header={<CardTitle reveal style={{height:200,backgroundSize:"cover",backgroundPosition:"50%",backgroundClip:"content-box"}} image={giftImg} waves='light'/>}
                  title={this.state.gift.giftName}
                  reveal={<div>{this.state.gift.description}</div>}>
                  <p>${this.state.gift.price}</p><br />
                  <div className = "btn btn-succes" onClick = {this.buyGift}>I Bought It! (Mark as Bought!)</div>
                  {/* <MediaBox style={{margin: "0 auto"}} width="150" height="150" border="0" src="//ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&MarketPlace=US&ASIN=B0773MLK5F&ServiceVersion=20070822&ID=AsinImage&WS=1&Format=_SL250_&tag=proj3team6-20"></MediaBox><div className="center"><a target="_blank"  href="https://www.amazon.com/gp/product/B0773MLK5F/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=B0773MLK5F&linkCode=as2&tag=proj3team6-20&linkId=e4c3144365a5c7b44bfb29fd14d3fc61">Buy</a><img src="//ir-na.amazon-adsystem.com/e/ir?t=proj3team6-20&l=am2&o=1&a=B0773MLK5F" width="1" height="1" border="0" alt="" style={{border:"none !important", margin:"0px !important"}} /></div> */}
              </MatCard>
              <div id="adSearchText"></div>
              <Row style={{paddingTop:"25px"}}>
                <Col size="s12 m6">
                  <div id="adSearchPics"></div>
                </Col>
                <Col size="s12 m6">
                  <Row>
                    {
                      this.state.searchResults.map(searchResult => (
                        <Col size="s12" style={{flex:"none"}}>
                        <MatCard style={{flexDirection:"initial"}} horizontal header={<CardTitle image={searchResult.galleryURL[0]}></CardTitle>}>
                          <p>{searchResult.title[0]}</p>
                        </MatCard>
                        </Col>
                      ))
                    }
                  </Row>
                </Col>
              </Row>
          </Col>
          <Col size="s12 m2">
            <div id="adDivRight"></div>
          </Col>
        </Row>
        <Row>
            <Col size="s12">
              <div id="adDivBottom"></div>
            </Col>
        </Row>
      </Container>
    );
  }
}

export default GiftDetail;
