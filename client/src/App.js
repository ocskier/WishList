import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import LoginForm from './pages/Auth/LoginForm';
import SignupForm from './pages/Auth/SignupForm';
import Nav from "./components/Nav";
import Home from "./pages/Home"
import Lists from './pages/Lists';
import GiftDetail from './pages/GiftDetail';
import Gifts from "./pages/Gifts";
import User from "./pages/User";
import Search from "./pages/Search";
import SearchUser from "./pages/SearchUser";
import NoMatch from "./pages/NoMatch";
import AUTH from './utils/AUTH';
import API from './utils/API';

import "./App.css";
// import API from './utils/API';

const image = './Images/home.jpg'

class App extends Component {
  
  constructor() {
    super();
    
		this.state = {
			loggedIn: false,
			user: null,
			register: false
    };
  }
  
	componentDidMount() {
		AUTH.getUser().then(response => {
			console.log(response.data);
			if (!!response.data.user) {
				this.setState({
					loggedIn: true,
					loginAttempt: false,
					user: response.data.user
				})
					API.getUser(response.data.user._id)
						.then(res =>
							this.setState({
							user: res.data})
						)
						.catch(err => console.log(err));
			} else {
				this.setState({
					loggedIn: false,
					loginAttempt: 0,
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
					loginAttempt: false,
					user: null,
					register: false
				});
			}
		});
	}

	login = (username, password) => {
		AUTH.login(username, password).then(response => {
			console.log(response.data.user);
      if (response.status === 200) {
        // update the state
        this.setState({
          loggedIn: true,
          user: response.data.user
        });
      }
    }, failure => {
			console.log("Failure");
				// alert("Incorrect User id or Password. Please try again.");
				this.setState({loginAttempt:true});
				console.log(this.state);
			// }
		 });
	}

	register = () => {
		this.setState({register: true})
	}

	render() {
		return (
			<div className="App">
        { this.state.loggedIn && (
					<div>
            <Nav user={this.state.user} logout={this.logout}>Wish List</Nav>

            <div className="main-view" style={{backgroundImage: `url(${image})`}}>
              <Switch>
                <Route exact path="/" component={() => <Home user={this.state.user} register={this.state.register}/>} />
                <Route exact path="/gifts/:id" component={({match}) => <Gifts user={this.state.user} id={match.params.id} />} />
								<Route exact path="/gifts" component={() => <Gifts user={this.state.user}/>} />
								<Route exact path="/lists" component={() => <Lists user={this.state.user}/>} />
								<Route exact path="/search" component={() => <Search user={this.state.user}/>} />
								<Route exact path="/giftdetail" component={() => <GiftDetail user={this.state.user}/>} />
								<Route exact path="/giftdetail/:id" component={({match}) => <GiftDetail user={this.state.user} giftid = {match.params.id}/>} />
								<Route exact path="/searchuser" component={() => <SearchUser user={this.state.user}/>} />
								<Route exact path="/users/:id" component={({match}) => <User user={this.state.user} id={match.params.id} />} />
                <Route component={NoMatch} />
              </Switch>
            </div>
          </div>
        )}
        { !this.state.loggedIn && (

          <div className="auth-wrapper">
						 {!this.state.register ? 
						 	<Route exact path="/" component={() => 
							 <div>
								 <nav style={{height: "120px",padding: "25px 20px 0 20px", backgroundColor: 'red'}}>
									<div className="nav-wrapper" style={{fontFamily: '"Mountains of Christmas", cursive'}}>
											<p className="brand-logo center" style={{fontSize: "6rem", textShadow: "3px 3px 5px #000000"}}>WishList</p>
									</div>
        				 </nav>
								<Home changeRegister={this.register}/>
							</div>
							} />
							:
							<Route exact path="/" component={() => <LoginForm loginAttempt={this.state.loginAttempt} login={this.login}/>} />
						 }
            <Route exact path="/gifts" component={() => <LoginForm login={this.login}/>} />
						<Route exact path="/gifts/:id" component={() => <LoginForm login={this.login}/>} />
						<Route exact path="/lists" component={() => <LoginForm login={this.login}/>} />
						<Route exact path="/search" component={() => <LoginForm login={this.login}/>} />
						<Route exact path="/giftdetail" component={() => <LoginForm login={this.login}/>} />
						<Route exact path="/giftdetail/:id" component={() => <LoginForm login={this.login}/>} />
						<Route exact path="/searchuser" component={() => <LoginForm login={this.login}/>} />
						<Route exact path="/users/:id" component={() => <LoginForm login={this.login}/>} />
            <Route exact path="/signup" component={SignupForm} />
          </div>
        )}
			</div>
		)
	}
}

export default App;
