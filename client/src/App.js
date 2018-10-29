import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import LoginForm from './pages/Auth/LoginForm';
import SignupForm from './pages/Auth/SignupForm';
import Nav from "./components/Nav";
import Home from "./pages/Home"
import Lists from './pages/Lists';
import GiftDetail from './pages/GiftDetail';
import Gifts from "./pages/Gifts";
import NoMatch from "./pages/NoMatch";
import AUTH from './utils/AUTH';

import "./App.css";

const image = './Images/home.jpg'

class App extends Component {
  
  constructor() {
    super();
    
		this.state = {
			loggedIn: false,
			user: null
    };
  }
  
	componentDidMount() {
		AUTH.getUser().then(response => {
			console.log(response.data);
			if (!!response.data.user) {
				this.setState({
					loggedIn: true,
					user: response.data.user
				});
			} else {
				this.setState({
					loggedIn: false,
					user: null
				});
			}
		});
	}

	logout = (event) => {
    event.preventDefault();
    
		AUTH.logout().then(response => {
			console.log(response.data);
			if (response.status === 200) {
				this.setState({
					loggedIn: false,
					user: null
				});
			}
		});
	}

	login = (username, password) => {
		AUTH.login(username, password).then(response => {
      console.log(response);
      if (response.status === 200) {
        // update the state
        this.setState({
          loggedIn: true,
          user: response.data.user
        });
      }
    });
	}

	render() {
		return (
			<div className="App">
        { this.state.loggedIn && (
          <div>
            <Nav user={this.state.user} logout={this.logout}>Wish List</Nav>
            <div className="main-view" style={{backgroundImage: `url(${image})`}}>
              <Switch>
                <Route exact path="/" component={() => <Home user={this.state.user}/>} />
                <Route exact path="/gifts/:id" component={({match}) => <Gifts user={this.state.user} id={match.params.id} />} />
								<Route exact path="/gifts" component={() => <Gifts user={this.state.user}/>} />
								<Route exact path="/lists" component={() => <Lists user={this.state.user}/>} />
								<Route exact path="/giftdetail" component={() => <GiftDetail user={this.state.user}/>} />
                <Route component={NoMatch} />
              </Switch>
            </div>
          </div>
        )}
        { !this.state.loggedIn && (
          <div className="auth-wrapper">
            <Route exact path="/" component={() => <LoginForm login={this.login}/>} />
            <Route exact path="/gifts" component={() => <LoginForm user={this.login}/>} />
						<Route exact path="/gifts/:id" component={() => <LoginForm user={this.login}/>} />
						<Route exact path="/lists" component={() => <LoginForm user={this.login}/>} />
						<Route exact path="/giftdetail" component={() => <LoginForm user={this.login}/>} />
            <Route exact path="/signup" component={SignupForm} />
          </div>
        )}
			</div>
		)
	}
}

export default App;
