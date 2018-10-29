import React, { Component } from "react";
import Postscribe from "postscribe";

// import DeleteBtn from "../../components/DeleteBtn";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
// import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
// import { List, ListItem } from "../../components/List";
import {Card} from "../../components/Card";
import {MediaBox} from "react-materialize";

// import "./GiftDetail.css";
const AmznImg ="//ws-na.amazon-adsystem.com/widgets/q?ServiceVersion=20070822&OneJS=1&Operation=GetAdHtml&MarketPlace=US&source=ac&ref=tf_til&ad_type=product_link&tracking_id=proj3team6-20&marketplace=amazon&region=US&placement=B07BKPV27P&asins=B07BKPV27P&linkId=2b7ce484dcf176ace03bd6f1763811e6&show_border=false&link_opens_in_new_window=false&price_color=333333&title_color=0066c0&bg_color=ffffff"

class GiftDetail extends Component {
  state = {
    books: [{giftName:"Gift1",pic:<MediaBox style={{margin: "0 auto"}} width="150" height="150" border="0" src="//ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&MarketPlace=US&ASIN=B0773MLK5F&ServiceVersion=20070822&ID=AsinImage&WS=1&Format=_SL250_&tag=proj3team6-20"></MediaBox>,link:<div className="center"><a target="_blank"  href="https://www.amazon.com/gp/product/B0773MLK5F/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=B0773MLK5F&linkCode=as2&tag=proj3team6-20&linkId=e4c3144365a5c7b44bfb29fd14d3fc61">Buy</a><img src="//ir-na.amazon-adsystem.com/e/ir?t=proj3team6-20&l=am2&o=1&a=B0773MLK5F" width="1" height="1" border="0" alt="" style={{border:"none !important", margin:"0px !important"}} /></div>}, 
    {giftName:"Gift2",link:<div className="center"><a target="_blank"  href="https://www.amazon.com/gp/product/B01EXWIBXS/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=B01EXWIBXS&linkCode=as2&tag=proj3team6-20&linkId=f198fb30a94596c5cf0fc32c6216a43f"><img width="150" height="150" border="0" src="//ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&MarketPlace=US&ASIN=B01EXWIBXS&ServiceVersion=20070822&ID=AsinImage&WS=1&Format=_SL250_&tag=proj3team6-20" /></a><img src="//ir-na.amazon-adsystem.com/e/ir?t=proj3team6-20&l=am2&o=1&a=B01EXWIBXS" width="1" height="1" border="0" alt="" style={{border:"none !important", margin:"0px !important"}} /></div>},
    {giftName:"Gift3",link:<div className="center"><a target="_blank"  href="https://www.amazon.com/gp/product/B074PY1M5G/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=B074PY1M5G&linkCode=as2&tag=proj3team6-20&linkId=602bbe02ff3b4ecca3160bf83e4f55ed"><img width="150" height="150" border="0" src="//ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&MarketPlace=US&ASIN=B074PY1M5G&ServiceVersion=20070822&ID=AsinImage&WS=1&Format=_SL250_&tag=proj3team6-20" /></a><img src="//ir-na.amazon-adsystem.com/e/ir?t=proj3team6-20&l=am2&o=1&a=B074PY1M5G" width="1" height="1" border="0" alt="" style={{border:"none !important", margin:"0px !important"}} /></div>}],
    // title: "",
    // author: "",
    // synopsis: ""
  };

  componentDidMount() {
    // this.loadBooks();
    Postscribe('#adDiv', '<div style="text-align: -webkit-center" className="aligncenter"><script type="text/javascript">amzn_assoc_ad_type = "banner";amzn_assoc_marketplace = "amazon";amzn_assoc_region = "US";amzn_assoc_placement = "assoc_banner_placement_default";amzn_assoc_campaigns = "gift_certificates";amzn_assoc_banner_type = "category";amzn_assoc_isresponsive = "true";amzn_assoc_banner_id = "1G274HKHXM7QERC7YAG2";amzn_assoc_tracking_id = "proj3team6-20";amzn_assoc_linkid = "00082d8280273b37a749e37f6b30f4c6";</script><script src="//z-na.amazon-adsystem.com/widgets/q?ServiceVersion=20070822&Operation=GetScript&ID=OneJS&WS=1"></script></div>');
  }

  loadBooks = () => {
    API.getBooks()
      .then(res =>
        this.setState({ books: res.data, title: "", author: "", synopsis: "" })
      )
      .catch(err => console.log(err));
  };

  deleteBook = id => {
    API.deleteBook(id)
      .then(res => this.loadBooks())
      .catch(err => console.log(err));
  };

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
          <Col size="m6 s12">
            <Jumbotron>
              <h3>Buy the Gift</h3>
            </Jumbotron>
            <Row>
              <Col size="s12">
                {
                  this.state.books.map(book => (
                  <Card title={book.giftName}>
                  {book.pic}
                  {book.link}
                  </Card>
                  ))
                }
                {/* <iframe style={{width:120,height:240,marginWidth:0,marginHeight:0,scrolling:"no",frameBorder:0}} src={AmznImg}></iframe> */}
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
            <Col size="s12">
              <div id="adDiv"></div>
            </Col>
        </Row>
      </Container>
    );
  }
}

export default GiftDetail;
