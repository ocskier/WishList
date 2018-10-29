import React, { Component } from "react";

import {Card} from "../../components/Card";
// import DeleteBtn from "../../components/DeleteBtn";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import './Lists.css';
import AddList from "../../components/AddList";

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
      <Container style={{paddingTop:"6rem"}} fluid>
        <Row>
          <Col size="m6">
          {/* <!--/ profile-page-header --> */}
          {/* <!-- profile-page-content --> */}
              {/* <!-- Profile About  --> */}
            <div className="about-me">
            <Card className="about-me" title="About Me!">
                <p className="center">Wanting a lot of electronics this season!</p>
                <List>
                  <ListItem>
                    <div className="row">
                      <div className="col s5">
                        <i className="material-icons left">poll</i> Name: </div>
                      <div className="col s7 right-align">{this.props.user.firstName + " " + this.props.user.lastName}</div>
                    </div>
                  </ListItem>
                  <ListItem>
                    <div className="row">
                      <div className="col s5">
                        <i className="material-icons left">domain</i> Lives in</div>
                      <div className="col s7 right-align">Raleigh-Durham, NC, USA</div>
                    </div>
                  </ListItem>
                </List>
            </Card>
            </div>
            {/* <!-- Profile About  --> */}
            {/* <!-- Profile About Details  --> */}
            
          </Col>
          <Col size="m6 s12">
            <div className="list-gifts">
            <Jumbotron>
              <h4>Gift Lists</h4>
            </Jumbotron>
            </div>            
            <div className="gifts">
            <List>
                {this.state.lists.map(list => (
                    <ListItem key={list._id} id={list._id}>
                      <i className="material-icons left">redeem</i>
                      <Link to={"/gifts/"+list._id}>
                      <strong>
                        {list.name}<br></br>{list.date}
                      </strong>
                      </Link>
                    </ListItem>
                  ))
                }
              </List>
            </div>
            <AddList></AddList>
            
            {/* )} */}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Lists;
