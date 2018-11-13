import React, { Component,Fragment } from "react";

import {Card} from "../../components/Card";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";

import "./Home.css"

const still1 = "./santa-claus-2927962_640.png";
const still2 = "./rawpixel-1084229-unsplash.jpg";
const still3 = "./etsysearch.jpeg";

class Home extends Component {
  state = {
    books: [],
    registerTxt: ""
      
  }

  componentDidMount () {

    !this.props.user ?
    this.setState({
      registerTxt: 
        <Fragment>
          <Link onClick={this.props.changeRegister} style= {{margin: "0 auto"}} to={"/"}>
            <strong style={{fontSize:"2rem",color: "green"}}>
              Register
            <span style={{fontSize:"2rem"}}>/</span>
              Login
            </strong>
          </Link>
        </Fragment>
      }) : null
  }

  render() {
    return (
      <Container style={{paddingTop:"6rem"}} fluid>
        <Row>
          <Col size="s6 m5">
            <Row style={{display:"block"}}>
              <Col size="m1"></Col>
              <Col size="m10 s12">
                <Card image={still1} link={this.props.user ?
                  <Link style={{margin: "0 auto"}} to={"/gifts/"}>
                    <strong style={{color: "green"}}>
                      Gifts
                    </strong>
                  </Link> : "Gifts"}
                >
                </Card>
              </Col>
              <Col size="m1"></Col>
            </Row>
          </Col>
          <Col size="s1 m2" style={{flex:"none"}}></Col>
          <Col size="s6 m5">
            <Row style={{display:"block"}}>
              <Col size="m1"></Col>
              <Col size="m10 s12">
                  <Card image={still2} link={this.props.user ?
                    <Link style= {{margin: "0 auto"}} to={"/lists/"}>
                      <strong style={{color: "green"}}>
                        Lists
                      </strong>
                    </Link> : "Lists"}
                  >
                  </Card>
              </Col>
              <Col size="m1"></Col>
            </Row>
          </Col>
        </Row>
        <Row>
        <Col size="s2 m5"></Col>
        <Col id="register" size="m2 s8">
            <Row style={{display:"block"}}>
              <Col size="m3"></Col>
              <Col size="m6 s12">
                <Row style={{paddingBottom:10}}>
                  {this.state.registerTxt}
                </Row> 
                <Row>
                  <Card image={still3} link={this.props.user ?
                    <Link style= {{margin: "0 auto"}} to={"/search/"}>
                      <strong style={{fontSize:"1rem",color: "green"}}>
                        Search (etsy.com)
                      </strong>
                    </Link> : "Search (etsy.com)"}
                  >
                  </Card>
                </Row>
              </Col>
              <Col size="m3"></Col>
            </Row>
          </Col>
          <Col size="s2 m5"></Col>
        </Row>
      </Container>
    );
  }
}

export default Home;