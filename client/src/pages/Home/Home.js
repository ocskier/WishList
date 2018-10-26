import React, { Component } from "react";

import {Card} from "../../components/Card";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";

class Home extends Component {
  state = {
    books: [],
  };

  componentDidMount() {
    // this.loadBooks();
  }

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="m6 s12">
          <Row>
          <Col size="m3 s12"></Col>
          <Col size="m6 s12">
          <Card link={
            <Link to={"/gifts/"}>
                <strong>
                    Gifts
                </strong>
            </Link>}
            >
          </Card>
          </Col>
          <Col size="m3 s12"></Col>
          </Row>
          </Col>
          <Col size="m6 s12">
          <Row>
          <Col size="m3 s12"></Col>
          <Col size="m6 s12">
            {/* <Jumbotron>
              <h1>Books On My List</h1>
            </Jumbotron> */}
            <Card link={
            <Link to={"/lists/"}>
              <strong>
                  Lists
              </strong>
            </Link>}
            >
            </Card>
            </Col>
          <Col size="m3 s12"></Col>
          </Row>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Home;