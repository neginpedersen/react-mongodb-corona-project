import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import StoryListEditable from "./components/story-list-editable.component";
import CreateStory from "./components/create-story.component";
import StoryList from "./components/story-list.component";
import HeaderNavbar from "./components/header-navbar.component";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Router, Switch, Route, Link } from "react-router-dom";
import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import BoardUser from "./components/board-user.component";
import BoardAdmin from "./components/board-admin.component";
import { logout } from "./actions/auth";
import { clearMessage } from "./actions/message";
import { history } from "./helpers/history";
class App extends Component {
 

   render() {

    return (
      <Router history={history}>
           <div className="App">
          <HeaderNavbar></HeaderNavbar>
            <Switch>
              <Route exact path={["/", "/home"]} component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/profile" component={Profile} />
              <Route path="/user" component={BoardUser} />
              <Route path="/admin" component={BoardAdmin} />
              <Route path="/story-list" component={StoryList} />
                <Route exact path='/' component={StoryList} /> 
                <Route path="/create-story" component={CreateStory} />
                <Route path="/story-list-editable" component={StoryListEditable} />
            </Switch>
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

export default connect(mapStateToProps)(App);