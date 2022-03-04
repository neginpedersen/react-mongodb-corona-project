import React, { Component } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import axios from 'axios';
//import ReCaptcha from 'react-google-recaptcha';
import ReCaptcha from "@matt-block/react-recaptcha-v2";



export default class CreateStoryCaptcha extends Component {

  constructor(props) {
    super(props)

    // Setting up functions
    this.onChangeStoryName = this.onChangeStoryName.bind(this);
    this.onChangeStoryEmail = this.onChangeStoryEmail.bind(this);
    this.onChangeStoryRollno = this.onChangeStoryRollno.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onVerifycaptcha = this.onVerifycaptcha.bind(this);
    this.handletoken =this.handletoken.bind(this);

    // Setting up state
    this.state = {
      name: '',
      country: '',
      story: '',
      ablebutton:'',
      captchatoken:''

    }
  }


  onVerifycaptcha(){
    //this.setState({ablebutton:true});
    console.log('from verify');
    const capthcharequest = {response:this.state.captchatoken};
    console.log('fromtoken');
    axios.post('http://localhost:4000/verifyrecaptcha', capthcharequest)
    .then(/*res => console.log('response fromrecaptcha'+res*/res => res?this.setState({ablebutton:true}):this.setState({ablebutton:''})) 
    .catch(error => {
        console.error('There was an error!', error.message);
    });

  }



  
onSubmit(e){
  e.preventDefault()

  const storyObject = {
    name: this.state.name,
    country: this.state.country,
    story: this.state.story
  };

  axios.post('http://localhost:4000/storys/create-story', storyObject)
    .then(res => console.log(res.data));

  this.setState({
    name: '',
    country: '',
    story: ''
  });
}



  handletoken(token) {
    this.setState({captchatoken:token});
    console.log('1'+token);
     
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
        <ReCaptcha
        siteKey="6LdYB1UeAAAAAMelkxGtLKwir8RW7OSTtFmNelWh"
        theme="light"
        size="normal"
        onSuccess={(captcha) => this.setState({ablebutton:true}) /*console.log(`Successful, result is ${captcha}`)*/}
        onExpire={() => this.setState({ablebutton:''}) /*console.log("Verification has expired, re-verify.")*/}
        onError={() => this.setState({ablebutton:''}) /*console.log("Something went wrong, check your conenction")*/}
      />
        
        <Button variant="danger" disabled={!this.state.ablebutton}  size="lg" block="block" type="submit" >

          Create Story
        </Button>
      </Form>
    </div>
    
    </div>);
  }
}
