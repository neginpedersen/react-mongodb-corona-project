
import React, { Component } from 'react';
import axios from 'axios';
import StoryEditableRow from './story-editable-row.component';
import EditRowStoryList from './story-editable-row.component';


export default class StoryListEditable extends Component  {

constructor(props){
  super(props);
  this.state= {storys:[],newData:{},isEditing:true};
   this.DelStory = this.DelStory.bind(this);



}



DelStory=(story_id)=>{
  if (window.confirm("Are you sure?")) {

  //var index = this.state.storys.indexOf(story_id);
  axios.delete('http://localhost:4000/storys/delete-story/' + story_id)
      .then((res) => {
          this.setState({storys: this.state.storys.filter((storys)=> storys.story_id !== story_id)});
      console.log(this.state.storys);
        //this.state.storys.splice(index, 1);
       // this.setState(this.state.storys);
       console.log('story successfully deleted!');
      }).catch((error) => {
         console.log(error)
      })
  }
}

EnableEdit=()=>{
  this.setState({isEditing:true});
}

CancelEdit=()=>
{
  this.setState({isEditing:false});
  this.setState({newData:{name:'',country:'',story:'',id:''}});
}

SetnewData(id,field,data)
{
  this.setState({newData:{name:'',country:'',story:'',id:''}});
  this.setState({ newData: {...this.state.newData, [field]:data ,'id':id}});
}

SaveStory(story_id)
{
  const putdata ={
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
        // console.log(res);
          console.log('story successfully updated!');
        }).catch((error) => {
        })
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

render() {
  return (
    <table className='table-edit-story'>
      <thead>
        <tr>
          <th>Name</th>
          <th>Country</th>
          <th>Story</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {this.state.storys.map((story,index) => {
          return this.state.isEditing ? ( <EditRowStoryList key={story._id} StoryItem={story} handlenewdata={this.SetnewData} onsave={this.SaveStory} OnCancelEdit={this.CancelEdit} />
                     ) : ( <StoryEditableRow key={story._id} StoryItem={story} onEdit={this.EnableEdit} onDelete={this.DelStory} />

          );
        })}
      </tbody>

    </table>


  );
}
}