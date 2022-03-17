import React, { Component } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import ReCaptcha from "@matt-block/react-recaptcha-v2";



export default class CreateStoryCaptcha extends Component {

  constructor(props) {
    super(props)

    // Setting up functions
    this.onChangeStoryName = this.onChangeStoryName.bind(this);
    this.onChangeStoryEmail = this.onChangeStoryEmail.bind(this);
    this.onChangeStoryRollno = this.onChangeStoryRollno.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    // Setting up state
    this.state = {
      name: '',
      country: '',
      story: '',
      ablebutton:'',
      captchatoken:'',
      succes_story_create:''

    }
  }


onSubmit(e) {

  e.preventDefault()
  const storyObject = {
    name: this.state.name,
    country: this.state.country,
    story: this.state.story
  };

  axios.post('http://localhost:4000/storys/create-story', storyObject)
    .then(res => {
    
      this.setState({succes_story_create:1});
      console.log('sdsds');
    })
    .catch(error => {
      this.setState({succes_story_create:2});
      console.log(error.response.data.error);
   });
    this.setState({
    name: '',
    country: '',
    story: ''
  });
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
        <ReCaptcha siteKey="6LdYB1UeAAAAAMelkxGtLKwir8RW7OSTtFmNelWh" theme="light" size="normal"
        onSuccess={(captcha) => this.setState({ablebutton:true})}
        onExpire={() => this.setState({ablebutton:'',succes_story_create:''})}
        onError={() => this.setState({ablebutton:'',succes_story_create:''})}/>
        
        <Button variant="primary" disabled={!this.state.ablebutton}  size="lg" block="block" type="submit" >

          Create Story
        </Button>
        
        <div className={this.state.succes_story_create==1 ?'succes-box active':'deactive'}> You successgully have created a story!  </div>
        <div className={this.state.succes_story_create==2 ?'error-box active':'deactive'}> Ooops! Some thing went wrong! try again later.  </div>

      </Form>
      <br>
      </br>
      <br>
      </br>
      <br>
      </br>
      <br>
      </br>
    </div>
    
    </div>);
  }
}
