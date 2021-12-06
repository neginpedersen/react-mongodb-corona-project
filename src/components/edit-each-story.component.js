import React, { Component } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import axios from 'axios';

export default class EditEachStudent extends Component {

  constructor(props) {
    super(props)

    this.onChangeStoryName = this.onChangeStoryName.bind(this);
    this.onChangeStoryEmail = this.onChangeStoryEmail.bind(this);
    this.onChangeStoryRollno = this.onChangeStoryRollno.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    // State
    this.state = {
      name: 'ddddd',
      country: '',
      story: ''
    }
  }

  componentDidMount() {
    axios.get('http://localhost:4000/storys/edit-story/' + this.props.match.params.id)
      .then(res => {
        this.setState({
          name: res.data.name,
          country: res.data.country,
          story: res.data.story
        });
      })
      .catch((error) => {
        console.log(error);
      })
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

  onSubmit(e) {
    e.preventDefault()

    const storyObject = {
      name: this.state.name,
      country: this.state.country,
      story: this.state.story
    };

    axios.put('http://localhost:4000/storys/update-story/' + this.props.match.params.id, storyObject)
      .then((res) => {
        console.log(res.data)
        console.log('Story successfully updated')
      }).catch((error) => {
        console.log(error)
      })

    // Redirect to Story List 
    this.props.history.push('/story-list')
  }


  render() {
    return (<div className="form-wrapper">
      <Form onSubmit={this.onSubmit}>
        <Form.Group controlId="Name">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" value={this.state.name} onChange={this.onChangeStoryName} /> {this.state.name}
        </Form.Group>

        <Form.Group controlId="Country">
          <Form.Label>Country</Form.Label>
          <Form.Control type="text" value={this.state.country} onChange={this.onChangeStoryEmail} />
        </Form.Group>

        <Form.Group controlId="Story">
          <Form.Label>Story</Form.Label>
          <Form.Control type="text" value={this.state.story} onChange={this.onChangeStoryRollno} />
        </Form.Group>

        <Button variant="danger" size="lg" block="block" type="submit">
          Update Story
        </Button>
      </Form>
    </div>);
  }
}