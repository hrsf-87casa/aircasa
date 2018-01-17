import React from 'react';
import {
  Button,
  Collapse,
  FormGroup,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import { Link, Redirect } from 'react-router-dom';
import Search from './Search.jsx';
import 'bootstrap/dist/css/bootstrap.css';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      successfulLogin: false,
      displayMessage: '',
      currentUserId: '',
      signup: false,
    };
  }

  //write function to change signup, then rerender

  handleSignup() {
    console.log('IN handleSignup');
    this.setState({ signup: true });
  }

  handleChange(event) {
    console.log('IN LOGIN HANDLECHANGE');
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit() {
    //in here make the fetch
    // {username, password}
    //should handle 200 success, 401 failed login, 500 database failure
    //only get userId and status code back
    console.log('In HandleSubmit in Login.jsx');
    let { username, password } = this.state;
    if (username === '') {
      return this.setState({
        displayMessage: 'Loogin requires a usenamed',
      });
    }
    fetch('/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'content-type': 'application/JSON' },
    })
      .then(
        (resp) =>
          resp.statusCode === 200
            ? this.setState({
                successfulLogin: true,
                currentUserId: resp.body.userId,
              }) //how to handle the userId that is sent in
            : this.setState({
                displayMessage: `Set the error here. resp.status?`,
              }), //should be 401 only
      )
      .catch(console.error); // should be 500 only
  }
  //todo: render dispplay message
  render() {
    return (
      <div className="login-component">
        {this.state.successfulLogin ? (
          <Redirect
            to={{ pathname: `/listings/${this.state.currentUserId}` }} // this will be the first page they see on login
          />
        ) : (
          <div className="Login-Only">
            {this.state.signup ? (
              <div>
                <Redirect to="/signup" />
              </div>
            ) : (
              <FormGroup>
                <label>
                  <input
                    type="text"
                    name="username"
                    value={this.state.username}
                    placeholder="Enter your name"
                    onChange={(event) => this.handleChange(event)}
                  />
                  <br />
                  <input
                    type="text"
                    name="password"
                    value={this.state.password}
                    placeholder="Enter your password"
                    onChange={(event) => this.handleChange(event)}
                  />
                </label>
                <Button onClick={() => this.handleSubmit()}> Login </Button>
                <br />
                <Button onClick={() => this.handleSignup()}> Signup </Button>
              </FormGroup>
            )}
          </div>
        )}
      </div>
    );
  }
}
// <Redirect to="/signup">
//               <Button>Sign Up</Button>
//             </Redirect>