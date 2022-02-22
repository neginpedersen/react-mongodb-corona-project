import React, { Component } from "react";
import covid2trans from '../images/covid2trans.png'; 
import virus3 from '../images/virus3.png'; 
import Footer from './footer.component'; 
import UserService from "../services/user.service";
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: ""
    };
  }

  componentDidMount() {
    UserService.getPublicContent().then(
      response => {
        this.setState({
          content: response.data
        });
      },
      error => {
        this.setState({
          content:
            (error.response && error.response.data) ||
            error.message ||
            error.toString()
        });
      }
    );
  }

  render() {
    return (
    <div>
          <div className="dark-blue">
                <div className="flex-cont">
                  <div className="left-text">
                    <b><h1>Did you know?</h1></b>
                    <h3>Corona killed more than 5 millions<br></br> and affected more than 10 milions in the world</h3>
                  </div>
                  <Image src={covid2trans} />
                </div>
                <div className="jsx-4183910149 top-banner-bottom-angle"><svg id="svg-triangle-top" viewBox="0 0 200 15" preserveAspectRatio="none" className="jsx-4183910149 svg-triangle"><polygon points="0,15 200,0 0,0" className="jsx-4183910149"></polygon></svg><div className="jsx-4183910149 top-banner-page-breaker"></div></div>
          </div>
          <div className="light-grey">
                <div className="flex-cont"> 
                <Image src={virus3}  />
                <div className="right-text">
                  <b><h1>How did corona affect you?</h1></b>
                  <h3>Do you want to tell us your sotry?</h3>
                  <Button variant="dark" size="lg">Share your Story</Button>
                </div>
              </div>
          </div>
          <Footer></Footer>
    </div>  
    );
  }
}
