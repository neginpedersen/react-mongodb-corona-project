import React, { Component } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import CountrySelector from './country-selecetor.component';




export default class CreateStory extends Component {

  constructor(props) {
    super(props)

    // Setting up functions
    this.onChangeStoryName = this.onChangeStoryName.bind(this);
    this.onChangeStoryRollno = this.onChangeStoryRollno.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleCountrySelect = this.handleCountrySelect.bind(this);
    this.state = {
      name: '',
      country: '',
      story: ''
    }
  }

  onChangeStoryName(e) {
    this.setState({ name: e.target.value })
  }

  onChangeCountry(e) {
    this.setState({ country: e.target.value })
  }

  onChangeStoryRollno(e) {
    this.setState({ story: e.target.value })
  }

  handleCountrySelect(val){
    this.setState({ country: val })
    console.log('val:'+val);

  }

  onSubmit(e) {
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

  render() {
    return (<div>
    <div className="form-wrapper">
      <Form onSubmit={this.onSubmit}>
        <Form.Group controlId="Name">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" value={this.state.name} onChange={this.onChangeStoryName} />
        </Form.Group>

        <Form.Group controlId="Country">
          <Form.Label>Country</Form.Label>
        <CountrySelector onCountryselect={this.handleCountrySelect}></CountrySelector>
        </Form.Group>

        <Form.Group controlId="Story">
          <Form.Label>Story</Form.Label>
          <Form.Control as="textarea" rows="3" type="text" value={this.state.story} onChange={this.onChangeStoryRollno} />
        </Form.Group>

        <Button variant="primary" size="lg" block="block" type="submit">
          Create Story
        </Button>
      </Form>
    </div>

    </div>);
  }
}
