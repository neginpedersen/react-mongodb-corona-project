import React, { Component } from 'react';
import axios from 'axios';

export default class StoryTableRow extends Component {

    constructor(props) {
        super(props);
        this.deleteStory = this.deleteStory.bind(this);
    }

    deleteStory() {
        axios.delete('http://localhost:4000/storys/delete-story/' + this.props.obj._id)
            .then((res) => {
                console.log('Student successfully deleted!')
            }).catch((error) => {
                console.log(error)
            })
    }

    render() {
        return (
            <tr>
                <td>{this.props.obj.name}</td>
                <td>{this.props.obj.country}</td>
                <td>{this.props.obj.story}</td>
            </tr>
        );
    }
}