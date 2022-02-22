import React, { Component } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import ReCaptchaV2 from 'react-google-recaptcha';



export default class CreateStoryCaptcha extends Component {

  constructor(props) {
    super(props)

    // Setting up functions
    this.onChangeStoryName = this.onChangeStoryName.bind(this);
    this.onChangeStoryEmail = this.onChangeStoryEmail.bind(this);
    this.onChangeStoryRollno = this.onChangeStoryRollno.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handletoken =this.handletoken.bind(this);

    // Setting up state
    this.state = {
      name: '',
      country: '',
      story: '',
      ablebutton:true,
      captchatoken:''

    }
  }


  onSubmit(e){
    e.preventDefault();
   // let token= e.target.captcha.value;
    this.setState({ablebutton:true});
   const capthcharequest = {response:this.state.captchatoken};
   console.log('fromtoken');
   // axios.post('http://localhost:4000/verifycaptcha', storyObject)
     // .then(res => console.log(res.data));

      axios.post('http://localhost:4000/verifyrecaptcha', capthcharequest)
    .then(res => console.log('response fromrecaptcha'+res) )
    .catch(error => {
        console.error('There was an error!', error.message);
    });

  }




  handletoken(token) {
    this.setState({captchatoken:token});
    console.log('1'+token);
    console.log('2'+token.target.value);
    
    
  }

  
  onChangeStoryName(e) {
    this.setState({ name: e.target.value })
  }

  onChangeStoryEmail(e) {
    this.setState({ country: e.target.value })
  }

  onChangeStoryRollno(e) {
    this.setState({ story: e.target.value })
  }

  

  render() {
    return (<div>
     
   
    <div className="form-wrapper">
      <Form onSubmit={this.onSubmit}>
        <Form.Group controlId="Name">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" name='name' value={this.state.name} onChange={this.onChangeStoryName} />
        </Form.Group>

        <Form.Group controlId="Country">
          <Form.Label>Country</Form.Label>
          <Form.Control type="text" name='country' value={this.state.country} onChange={this.onChangeStoryEmail} />
        </Form.Group>

        <Form.Group controlId="Story">
          <Form.Label>Story</Form.Label>
          <Form.Control as="textarea" name='story' rows="3" type="text" value={this.state.story} onChange={this.onChangeStoryRollno} />
        </Form.Group>
        <ReCaptchaV2 sitekey='6LdYB1UeAAAAAMelkxGtLKwir8RW7OSTtFmNelWh' name='captcha' onChange={this.handletoken}  />
        
        <Button variant="danger" disabled={!this.state.ablebutton
        
        
        
        
        }  size="lg" block="block" type="submit">

          Create Story
        </Button>
      </Form>
    </div>
    
    </div>);
  }
}
