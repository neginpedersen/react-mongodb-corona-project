
import React, { Component } from 'react';
import axios from 'axios';


export default class StoryListEditable extends Component  {

constructor(props){
  super(props);
  this.state= {storys:[],newData:{},isEditing:false};
 

}

componentDidMount() {
  axios.get('http://localhost:4000/storys/',{ crossDomain: true })
    .then(res => {  
      this.setState({
        storys: res.data
      });
     // console.log(this.state.storys);

      })
     
    .catch((error) => {
     // console.log(error);
    })
} 

DelStory(story_id){
  if (window.confirm("Are you sure?")) {
  var index = this.state.storys.indexOf(story_id);
  axios.delete('http://localhost:4000/storys/delete-story/' + story_id)
      .then((res) => {
        this.state.storys.splice(index, 1);
        this.setState(this.state.storys);
       // console.log('story successfully deleted!');
      }).catch((error) => {
        //  console.log(error)
      })
  }
}

EnableEdit()
{
  this.setState({isEditing:true});
}

CancelEdit()
{
  this.setState({isEditing:false});
  this.setState({newData:{name:'',country:'',story:'',id:''}});
}

SetnewData(id,field,data){
  if(id === this.state.newData['id']){ this.setState({ newData: {...this.state.newData, [field]:data ,'id':id}})}
  else{ this.setState({newData:{name:'',country:'',story:'',id:''}});
  this.setState({ newData: {...this.state.newData, [field]:data ,'id':id}});
}

}

SaveStory(story_id){
const putdata={
    _id:story_id,
    name: this.state.newData.name,
    country: this.state.newData.country,
    story: this.state.newData.story
  }
  axios.put('http://localhost:4000/storys/update-story/' + story_id,putdata,{
    headers: {
      "x-access-token": "token-value",
    },
  })
      .then((res) => {
       console.log(res);
        console.log('story successfully updated!');
      }).catch((error) => {
      })

}

render() {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Country</th>
          <th>Story</th>
        </tr>
      </thead>
      <tbody>
        {this.state.storys.map((story,index) => {
          return this.state.isEditing ? (
            <tr key={story._id}>
              <td>
                <input
                  type="text"
                  defaultValue={story.name}
                  onChange={(e) => this.SetnewData(story._id,'name',e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  defaultValue={story.country}
                  onChange={(e) => this.SetnewData(story._id,'country',e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  defaultValue={story.story}
                  onChange={(e) => this.SetnewData(story._id,'story',e.target.value)}
                />
              </td>
              <td>
                <button className="btn green-btn" onClick={() => this.SaveStory(story._id)}>
                  Save
                </button>
                <button
                  className="btn default-btn"
                  onClick={() => this.CancelEdit()}
                >
                  Cancel
                </button>
              </td>
            </tr>
          ) : (
            <tr key={story._id}>
              <td>{story.name}</td>
              <td>{story.story}</td>
              <td>
                <button
                  className="btn default-btn"
                  onClick={() => this.EnableEdit()}
                >
                  Edit
                </button>
                <button
                  className="btn red-btn"
                  onClick={() => this.DelStory(story._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>

  );
}
}