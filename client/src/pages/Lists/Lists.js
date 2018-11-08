import React, { Component } from "react";
import {Card} from "../../components/Card";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import {Collection,CollectionItem,Collapsible,CollapsibleItem,Input,Row as MatRow} from 'react-materialize';
import Moment from 'react-moment';
import './Lists.css';

declare var $: any; 

class Lists extends Component {
  state = {
    userlists: [],
    sharedlists: [],
    newlistname: "",
    newfirstName: this.props.user.firstName, 
    newlastName: this.props.user.lastName,
    city: '',
    region: '',
    country: ''
  };

  
  componentDidMount() {
    this.prepareLists();
    this.getLocation();
  }

  getLocation = () => {
    API.getLocation()
    .then(res => {
      console.log(res);
      this.setState({
        city: res.data.city,
        region: res.data.region,
        country: res.data.country
      })
    }).then(result => {
      console.log(this.state)
    })
    ;
  }
  

  prepareLists = () => {
    API.getUser(this.props.user._id)
    .then(res => {
      console.log(res);
      this.setState({
        userlists: res.data.wishlists,
        sharedlists: res.data.sharedlists
      })
    }
    )
    .catch(err => console.log(err))
  }

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

  updateUser = () => {
    
    API.updateUser({firstName: this.state.newfirstName, lastName: this.state.newlastName})
      .then(res => window.location.reload());
  }

  addList = (e) => {
    e.preventDefault();
    API.makeList({
      user: this.props.user._id, 
      name: this.state.newlistname
    }).then((res) => {
        console.log(res);
        this.setState({
          newlistname: ""
        }, () => 
          API.getUser(this.props.user._id)
          .then(res =>
            this.setState({ userlists: res.data.wishlists})
          )
        )
    })
    .catch((err) => console.log(err));
  }

  // removeUserLists = () => {
  //   let filteredList = this.state.lists;
  //   for (let i = 0; i < this.state.userlists.length; i++) {
  //     filteredList = this.filterList(filteredList,this.state.userlists[i]._id);
  //   }
  //   return filteredList
  // }

  // filterList = (mylist,id) => {
  //   return mylist.filter(list=>!(list._id===id))
  // }

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
                  <Collection>
                    <CollectionItem>
                      <div className="row">
                        <div className="col s5">
                          <i className="material-icons left">poll</i> Name: </div>
                        <div className="col s7 right-align">{this.props.user.firstName + " " + this.props.user.lastName}</div>
                      </div>
                    </CollectionItem>
                    <CollectionItem>
                      <div className="row">
                        <div className="col s5">
                          <i className="material-icons left">domain</i>Location</div>
                        <div className="col s7 right-align">{`${this.state.city}, ${this.state.region}, ${this.state.country}`}</div>
                      </div>
                    </CollectionItem>
                    <p className="center" style={{width: "80%",margin:"5px auto 0",border:"2px solid"}}>My Lists</p>
                    <div style={{width:"80%",margin:"0 auto"}}>
                      <List>
                        {
                          this.state.userlists.map(list => (
                            <li className="collection-item" key={list._id} id={list._id}>
                              <i className="material-icons left">redeem</i>
                              <Link to={"/gifts/"+list._id}>
                                <strong>
                                  {list.name}<br></br>
                                  <Moment date={list.date} format="MM-DD-YYYY hh:mm" />
                                </strong>
                              </Link>
                            </li>
                          ))
                        }
                      </List>
                    </div>
                  </Collection>
                  <Collapsible popout defaultActiveKey={1}>
                    <CollapsibleItem header='Add A List' icon='filter_drama'>
                      <Card link={<button onClick={this.addList} className="btn green waves-effect waves-light" type="submit" name="action">
                        <i style={{marginLeft:0}} className="material-icons right">add</i></button>}>
                        <MatRow style={{flex:"none",display: "block"}}>
                          <Input onChange={this.handleInputChange} style={{fontWeight:"bold"}} s={6} label="List Name" defaultValue={this.state.newlistname} name="newlistname" />
                        </MatRow>
                      </Card>
                    </CollapsibleItem>
                  </Collapsible>
                  <Collapsible popout defaultActiveKey={1}>
                    <CollapsibleItem header='Edit your Profile' icon='filter_drama'>
                      <Card link={<button onClick={this.updateUser} className="btn green waves-effect waves-light" type="submit" name="action">
                        Apply</button>}>
                        <MatRow style={{flex:"none",display: "block"}}>
                          <Input onChange={this.handleInputChange} style={{fontWeight:"bold"}} s={6} label="First Name" defaultValue={this.state.newfirstName} name="newfirstName" />
                          <Input onChange={this.handleInputChange} style={{fontWeight:"bold"}} s={6} label="Last Name" defaultValue={this.state.newlastName} name="newlastName" />
                        </MatRow>
                      </Card>
                    </CollapsibleItem>
                  </Collapsible>
              </Card>
            </div>   
          </Col>

          <Col size="m6 s12">
            
            <div className="list-gifts">
              <Jumbotron>
                <h4>Gift Lists</h4>
              </Jumbotron>
            </div>            
            <div className="gifts">
              <List>
                  {
                    this.state.sharedlists.map(list=> (
                        <li style={{background:"white"}} key={list._id} id={list._id}>
                          <i className="material-icons left">redeem</i>
                          <Link to={"/gifts/"+list._id}>
                          <strong>
                            {list.name}<br></br>
                            <Moment date={list.date} format="MM-DD-YYYY hh:mm" />
                          </strong>
                          </Link>
                        </li>
                      ))
                  }
              </List>
            </div>
            <br/>
            <Link to="/searchuser"><button className = 'btn search-friend' >Search for a Friend!</button></Link>

          </Col>
        </Row>
      </Container>
    );
  }
}

export default Lists;
