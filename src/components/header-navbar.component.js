import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import "bootstrap/dist/css/bootstrap.css";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { connect } from "react-redux";
import { Router, Link } from "react-router-dom";
//import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { logout } from "../actions/auth";
import { clearMessage } from "../actions/message";
import { history } from '../helpers/history';

class HeaderNavbar extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
        showAdminBoard: false,
      currentUser: undefined,
    };

    history.listen((location) => {
      props.dispatch(clearMessage()); // clear message when changing location
    });
  }

  componentDidMount() {
    const user = this.props.user;

    if (user) {
      this.setState({
        currentUser: user,
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }
  }

  logOut() {
    this.props.dispatch(logout());
  }

   
    render() {
      const { currentUser,showAdminBoard } = this.state;

        return (
          <Router history={history}>
          <div>
                    
            <header className="App-header">
      
            <Navbar bg="light" variant="light">
              <Container>
    
                <Navbar.Brand>
                  <Link to={"/create-story"} className="nav-link">
                    Corona Story
                  </Link>
                </Navbar.Brand>
    
                <Nav className="nav-link">
                {showAdminBoard && (
                  <Nav>
                  <Link to={"/admin"} className="nav-link">
                  Admin Board
                  </Link>
                </Nav>  
              
              )}

              {currentUser && (
                <Nav>
                  <Link to={"/user"} className="nav-link">
                    User
                  </Link>
                  </Nav>
              )}
               {currentUser ? (<div className="inherit-display">
             <Nav>
                  <Link to={"/profile"} className="nav-link">
                    {currentUser.username}
                  </Link>
              </Nav>
              <Nav>
              <a href="/login" className="nav-link" onClick={this.logOut}>
                    LogOut
                  </a>
            </Nav>
            </div>
              
            ) : (
              <div className="inherit-display">
              <Nav>
                  <Link to={"/login"} className="nav-link">
                    Login
                  </Link>
                  </Nav>
                  <Nav>
                  <Link to={"/create-story-captcha"} className="nav-link">
                  create-story-captcha
                  </Link>
                  </Nav>
                  <Nav>
                  <Link to={"/register"} className="nav-link">
                    Sign Up
                  </Link>
              </Nav>
              </div>
            )}
                <Nav>
                    <Link to={"/create-story"} className="nav-link">
                      Create Story
                    </Link>
                  </Nav>
    
                  {<Nav>
                    <Link to={"/story-list-editable"} className="nav-link">
                      Editable Story list
                    </Link>
                  </Nav> }
    
                  <Nav>
                    <Link to={"/story-list"} className="nav-link">
                      Story List
                    </Link>
                  </Nav>
                </Nav>
    
              </Container>
            </Navbar>
          </header>
          </div>
          </Router> 
        );
    }
  }
  

    function mapStateToProps(state) {
      const { user } = state.auth;
      return {
        user,
      };
    }


    export default connect(mapStateToProps)(HeaderNavbar);

