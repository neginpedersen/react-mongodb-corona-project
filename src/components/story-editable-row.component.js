import React, { Component } from 'react';

export default class StoryEditableRow extends Component {
    constructor(props){
        super(props);
        this.state= {storyData:[]}

    }
    render() {
        var story = this.props.StoryItem;
        console.log(JSON.stringify(story));
        return (

                 <tr key={story._id}>
              <td>{story.name}</td>
              <td>{story.country}</td>
              <td>{story.story}</td>
              <td>
                <button
                  className="btn default-btn"
                  onClick={this.props.OnEdit}>
                  Edit
                </button>
                <button
                  className="btn red-btn"
                  onClick={this.props.onDelete}>
                  Delete
                </button>
              </td>
            </tr>

        );
    }
}



export class EditRowStoryList extends Component {
    render() {
        var story = this.props.StoryItem;
        return (
            <tr key={story._id}>
              <td>
                <input
                  type="text" name='name'
                  defaultValue={story.name}
                  onChange={(e)=>this.props.handlenewdata(story._id,'name',e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text" name='country'
                  defaultValue={story.country}
                  onChange={(e)=>this.props.handlenewdata(story._id,'country',e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text" name='story'
                  defaultValue={story.story}
                  onChange={(e)=>this.props.handlenewdata(story._id,'story',e.target.value)}
                />
              </td>
              <td>
                <button className="btn green-btn" onClick={this.props.onsave(story._id)}>
                  Save
                </button>
                <button
                  className="btn default-btn"
                  onClick={this.props.OnCancelEdit()}
                >
                  Cancel
                </button>
              </td>
            </tr>

        );
    }
}
