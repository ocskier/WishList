import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import {Alert} from 'react-bootstrap';
import { Container, Row, Col } from '../../components/Grid';
import { Card } from '../../components/Card';
import { Input, FormBtn } from '../../components/Form';
import './LoginForm.css'

const image = './Images/login.jpg'

class LoginForm extends Component {
  
  constructor() {
    super();
    
		this.state = {
			username: '',
			password: '',
			redirectTo: null,
			loginAttempt: false
		};
	}

	handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		});
	}

	handleSubmit = (event) => {
		event.preventDefault();
		console.log('handleSubmit');
		this.props.login(this.state.username, this.state.password);

		this.setState({
			redirectTo: '/',
			loginAttempt: false
		});
	}

	componentDidMount(){
  console.log(this.props.loginAttempt);
	};

	render() {
		if (this.state.redirectTo) {
			return <Redirect to={{ pathname: this.state.redirectTo }} />
		} else {
			return (
				<div className="login valign-wrapper" style={{backgroundImage: `url(${image})`}}>
				<Container>
					{this.props.loginAttempt ? (<Alert bsStyle ="danger"> Incorrect Username or Password - please try again  </Alert>): null}
          <Row style={{display: "-webkit-box"}}>
            <Col size="s1 m2 l3"></Col>
            <Col size="s10 m8 l6">
              <Card title="Welcome to WishList">
                <form style={{marginTop: 10}}>
                  <label htmlFor="username">Username: </label>
                  <Input
                    type="text"
                    name="username"
                    value={this.state.username}
                    onChange={this.handleChange}
                  />
                  <label htmlFor="password">Password: </label>
                  <Input
                    type="password"
                    name="password"
                    value={this.state.password}
                    onChange={this.handleChange}
                  />
                  <Link to="/signup">Register</Link>
                  <FormBtn onClick={this.handleSubmit}>Login</FormBtn>
                </form>
              </Card>
            </Col>
            <Col size="s1 m2 l3"></Col>
          </Row>
				</Container>
				</div>
			)
		}
	}
}

export default LoginForm;
