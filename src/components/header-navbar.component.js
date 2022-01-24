import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import coronavirus from '../coronavirus.jpg'; 
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';
import "bootstrap/dist/css/bootstrap.css";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export default class HeaderNavbar extends Component {

   
    render() {
        return (
                    
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
        );
    }
}

