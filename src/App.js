import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import Header from './components/header.component';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import StoryListEditable from "./components/story-list-editable.component";
import CreateStory from "./components/create-story.component";
import EditStory from "./components/edit-story.component";
import EditEachStory from "./components/edit-each-story.component";
import StoryList from "./components/story-list.component";


function App() {
  return (<Router>
    <div className="App">
      <header className="App-header">
      
        <Navbar bg="light" variant="light">
          <Container>

            <Navbar.Brand>
              <Link to={"/create-story"} className="nav-link">
                Corona Story
              </Link>
            </Navbar.Brand>

            <Nav className="justify-content-end">
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
      <Header></Header>
     
      <Container>
        <Row>
          <Col md={12}>
            <div className="wrapper">
              <Switch>
                <Route exact path='/' component={CreateStory} />
                <Route path="/create-story" component={CreateStory} />
                <Route path="/edit-story/:id" component={EditStory} />
                <Route path="/story-list" component={StoryList} />
                <Route path="/story-list-editable" component={StoryListEditable} />
                <Route path="/edit-each-story" component={EditEachStory} />

              </Switch>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  </Router>);
}

export default App;