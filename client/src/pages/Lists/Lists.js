import React, { Component } from "react";

import {Card} from "../../components/Card";
// import DeleteBtn from "../../components/DeleteBtn";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";

class Lists extends Component {
  state = {
    lists: [{msg:"List1"},{msg:"List2"},{msg:"List3"}]
    // title: "",
    // author: "",
    // synopsis: ""
  };

  componentDidMount() {
    this.loadLists();
  }

  loadLists = () => {
    API.getLists()
      .then(res =>
        this.setState({ lists: res.data})
      )
      .catch(err => console.log(err));
  };

  deleteList = id => {
    API.deleteList(id)
      .then(res => this.loadLists())
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  // handleFormSubmit = event => {
  //   event.preventDefault();
  //   if (this.state.title && this.state.author) {
  //     API.saveBook({
  //       title: this.state.title,
  //       author: this.state.author,
  //       synopsis: this.state.synopsis
  //     })
  //       .then(res => this.loadBooks())
  //       .catch(err => console.log(err));
  //   }
  // };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="m6">
          {/* <!--/ profile-page-header --> */}
          {/* <!-- profile-page-content --> */}
              {/* <!-- Profile About  --> */}
            <Card title="About Me!">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                <List>
                  <ListItem>
                    <div className="row">
                      <div className="col s5">
                        <i className="material-icons left">poll</i> Skills</div>
                      <div className="col s7 right-align">Super awesome teaching powers</div>
                    </div>
                  </ListItem>
                  <ListItem>
                    <div className="row">
                      <div className="col s5">
                        <i className="material-icons left">domain</i> Lives in</div>
                      <div className="col s7 right-align">Durham, NC, USA</div>
                    </div>
                  </ListItem>
                </List>
            </Card>
            {/* <!-- Profile About  --> */}
            {/* <!-- Profile About Details  --> */}
            
          </Col>
          <Col size="m6 s12">
            <Jumbotron>
              <h4>Gift Lists</h4>
            </Jumbotron>
            <List>
                {this.state.lists.map(list => (
                    <ListItem key={list._id} id={list._id}>
                      <i className="material-icons left">redeem</i>
                      <Link to={"/gifts/"+list._id}>
                      <strong>
                        {list.user}<br></br>{list.name}
                      </strong>
                      </Link>
                    </ListItem>
                  ))
                }
              </List>
              <h3 className="center">No Results to Display</h3>
            {/* )} */}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Lists;
