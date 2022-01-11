import React from "react";
//import Nav from "react-bootstrap/Nav";
//import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import Header from './components/header.component';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import StoryListEditable from "./components/story-list-editable.component";
import CreateStory from "./components/create-story.component";
import StoryList from "./components/story-list.component";
import HeaderNavbar from "./components/header-navbar.component";
import Counter from "./components/Counter";



function App() {
  return (<Router>
    <div className="App">
    <HeaderNavbar></HeaderNavbar>
      <Header></Header>
      <Container>
        <Row>
          <Col md={12}>
            <div className="wrapper">
              <Switch>
                <Route path="/story-list" component={StoryList} />
                <Route exact path='/' component={StoryList} /> 
                <Route path="/create-story" component={CreateStory} />
                <Route path="/counter" component={Counter} />
                <Route path="/story-list-editable" component={StoryListEditable} />
              </Switch>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  </Router>);
}

export default App;