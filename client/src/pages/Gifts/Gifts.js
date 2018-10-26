import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import Jumbotron from "../../components/Jumbotron";
import {List,ListItem} from "../../components/List";

import API from "../../utils/API";

class Gifts extends Component {

  state = {
    books: [{msg:"Gift1"},{msg:"Gift2"},{msg:"Gift3"}]
    // title: "",
    // author: "",
    // synopsis: ""
  };

  componentDidMount() {
    // this.loadBooks();
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
          <List>
                {this.state.books.map(book => (
                    <ListItem>
                      <strong>
                       <Link to={"/giftdetail/"}>{book.msg}</Link>
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
