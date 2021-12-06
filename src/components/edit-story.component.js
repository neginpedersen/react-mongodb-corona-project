import React, { Component } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';


export default class EditStory extends Component {

  constructor(props) {
    super(props);
    this.deleteStory = this.deleteStory.bind(this);
   
  }

  deleteStory() {
    axios.delete('http://localhost:4000/storys/delete-story/' + this.props.obj._id)
        .then((res) => {
            console.log('Story successfully deleted!')
        }).catch((error) => {
            console.log(error)
        })
}

 

  


  render() {
    return (<div>
      <tr>
        <td>{this.props.obj.name}</td>
        <td>{this.props.obj.country}</td>
        <td>{this.props.obj.story}</td>
        <td>
                    <Link className="edit-link" to={"/edit-each-story/" + this.props.obj._id}>
                        Edit
                    </Link>
                    <Button onClick={this.deleteStory} size="sm" variant="danger">Delete</Button>
                </td>
      </tr>
        
     
  </div>);
  }
}
