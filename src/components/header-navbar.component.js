import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.css";
import { connect } from "react-redux";
import { Router, Link } from "react-router-dom";
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

              <nav className='navbar dark-blue'>
                <div className='container'>

               <div className="nav-link navbar-nav">
                  <Link to={"/create-story"} className="nav-link light-text ">
                    Corona Story
                  </Link>
                </div>


                {showAdminBoard && (
                  <div className="nav-link navbar-nav">
                  <Link to={"/admin"} className="nav-link light-text">
                  Admin Board
                  </Link>
                </div>


              )}

              {currentUser && (
                <div className="nav-link navbar-nav">
                  <Link to={"/user"} className="nav-link">
                    User
                  </Link>
                  </div>
              )}
               {currentUser ? (<div className="inherit-display">
             <div className="nav-link navbar-nav">
                  <Link to={"/profile"} className="nav-link">
                    {currentUser.username}
                  </Link>
              </div>
              <div  className="nav-link navbar-nav">
              <a href="/login" className="nav-link" onClick={this.logOut}>
                    LogOut
                  </a>
            </div>
            </div>

            ) : (
              <div className="inherit-display">
              <div className="nav-link navbar-nav">
                  <Link to={"/login"} className="nav-link light-text">
                    Login
                  </Link>
              </div>
                  <div className="nav-link navbar-nav">
                  <Link to={"/create-story-captcha"} className="nav-link light-text">
                  create-story-captcha
                  </Link>
                  </div>
                  <div className="nav-link navbar-nav">
                  <Link to={"/register"} className="nav-link light-text">
                    Sign Up
                  </Link>
              </div>
              </div>
            )}
                <div className="nav-link navbar-nav">
                    <Link to={"/create-story"} className="nav-link light-text">
                      Create Story
                    </Link>
                  </div>



                  {<div className="nav-link navbar-nav">
                    <Link to={"/story-list-editable"} className="nav-link light-text">
                      Editable Story list
                    </Link>
                  </div> }

                  <div className="nav-link navbar-nav">
                    <Link to={"/story-list"} className="nav-link light-text">
                      Story List
                    </Link>
                  </div>
                </div>
                </nav>
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
