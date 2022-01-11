
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
//  console.log(this.state.newData);
}

SetnewData(id,field,data){
  if(id === this.state.newData['id']){ this.setState({ newData: {...this.state.newData, [field]:data ,'id':id}})}
  else{ this.setState({newData:{name:'',country:'',story:'',id:''}});
  this.setState({ newData: {...this.state.newData, [field]:data ,'id':id}});
}

 // console.log(this.state.newData);
}

SaveStory(story_id){
const putdata={
    _id:story_id,
    name: this.state.newData.name,
    country: this.state.newData.country,
    story: this.state.newData.story
  }
 console.log('from7'+JSON.stringify(this.state.newData));

  axios.put('http://localhost:4000/storys/update-story/' + story_id,putdata,{
    headers: {
      "x-access-token": "token-value",
    },
  })
      .then((res) => {
       console.log(res);
        //this.setState(this.state.storys);
        console.log('story successfully updated!');
      }).catch((error) => {
        //  console.log(error)
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
/*

class EditableRow extends Component {
 

  render() {
    return (
      <tr>
      <td>
        <input type='text' name={this.props.cellData.type} id={this.props.cellData.id} value={this.props.cellData.value} onChange={this.props.onStoryTableUpdate}/>
      </td>
      <td>
        <input type='text' name={this.props.cellData.type} id={this.props.cellData.id} value={this.props.cellData.value} onChange={this.props.onStoryTableUpdate}/>
      </td>
      <td>
        <input type='text' name={this.props.cellData.type} id={this.props.cellData.id} value={this.props.cellData.value} onChange={this.props.onStoryTableUpdate}/>
      </td>
      </tr>
    );

  }
  

  constructor(props) {
    super(props);

    this.state = {};
    this.state.filterText = "";
    this.state.storys = [];
  }
  componentDidMount() {
    axios.get('http://localhost:4000/storys/',{ crossDomain: true })
      .then(res => {  
        this.setState({
          storys: res.data
        });
        })
      .catch((error) => {
        console.log(error);
      })
  }

  handleUserInput(filterText) {
    this.setState({filterText: filterText});
  };

  handleRowSave(story) {
    
    let editedIndex = this.state.storys.indexOf( story._id);
   // console.log(editedIndex);
    axios.put('http://localhost:4000/storys/update-story/' + story._id, story)
    .then((res) => {
      console.log('story successfully updated')
    }).catch((error) => {
     // console.log(error)
    })
    
  };

  handleRowDel(story) {
    var index = this.state.storys.indexOf(story);
    axios.delete('http://localhost:4000/storys/delete-story/' + story._id)
        .then((res) => {
          //  console.log('story successfully deleted!')
        }).catch((error) => {
          //  console.log(error)
        })
    this.state.storys.splice(index, 1);
    this.setState(this.state.storys);
  };

  handleAddEvent(evt) {
    var id = (+ new Date() + Math.floor(Math.random() * 999999)).toString(36);
    var story = {
      id: id,
      name: "",
      country: "",
      story: ""
      }
    this.state.storys.push(story);
    this.setState(this.state.storys);

  }

  handleStoryTable(evt) {
    var item = {
      _id: evt.target.id,
      country: evt.target.country,
      story: evt.target.story
    };
console.log(evt);

    let editedIndex = this.state.storys.indexOf( item._id);
    console.log(editedIndex);
    axios.put('http://localhost:4000/storys/update-story/' + item._id, item.story)
    .then((res) => {
      console.log(res.data);
      var storys = this.state.storys.slice();
  var newstorys = storys.map(function(story) {

    for (var key in story) {
      if (key === item.name && story.id === item._id) {
        story[key] = item.value;

      }
    }
    return story;
  });
    this.setState({storys:newstorys});
      console.log('story successfully updated')
    }).catch((error) => {
      console.log(error)
    })

  

  //  console.log(this.state.storys);
  };
  render() {

    return (
      <div>
        <SearchBar filterText={this.state.filterText} onUserInput={this.handleUserInput.bind(this)}/>
        <StoryTable onStoryTableUpdate={this.handleStoryTable.bind(this)} onRowAdd={this.handleAddEvent.bind(this)} onRowDel={this.handleRowDel.bind(this)} onRowSave={this.handleRowSave.bind(this)} storys={this.state.storys} filterText={this.state.filterText}/>
      </div>
    );

  }

}
class SearchBar extends Component {
  handleChange() {
    this.props.onUserInput(this.refs.filterTextInput.value);
  }
  render() {
    return (
      <div>

        <input type="text" placeholder="Search..." value={this.props.filterText} ref="filterTextInput" onChange={this.handleChange.bind(this)}/>

      </div>

    );
  }

}

class StoryTable extends Component {

  render() {
    var onStoryTableUpdate = this.props.onStoryTableUpdate;
    var rowDel = this.props.onRowDel;
    var rowSave = this.props.onRowSave;
    var filterText = this.props.filterText;
    var story = this.props.storys.map(function(story) {
      if (story.name.indexOf(filterText) === -1) {
        return;
      }
      return (<StoryRow onStoryTableUpdate={onStoryTableUpdate} story={story} onDelEvent={rowDel.bind(this)} onSaveEvent={rowSave.bind(this)} key={story.id}/>)
    });
    return (
      <div>


      <button type="button" onClick={this.props.onRowAdd} className="btn btn-success pull-right">Add</button>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Name</th>
              <th>country</th>
              <th>story</th>
              
            </tr>
          </thead>

          <tbody>
            {story}

          </tbody>

        </table>
      </div>
    );

  }

}

class StoryRow extends Component {
  onDelEvent() {
    this.props.onDelEvent(this.props.story);

  }
  onSaveEvent(){
    this.props.onSaveEvent(this.props.story);
  }
  render() {

    return (
      <tr className="eachRow">
        <EditableCell onStoryTableUpdate={this.props.onStoryTableUpdate} cellData={{
          "type": "name",
          value: this.props.story.name,
          id: this.props.story.id
        }}/>
        <EditableCell onStoryTableUpdate={this.props.onStoryTableUpdate} cellData={{
          type: "country",
          value: this.props.story.country,
          id: this.props.story.id
        }}/>
        <EditableCell onStoryTableUpdate={this.props.onStoryTableUpdate} cellData={{
          type: "story",
          value: this.props.story.story,
          id: this.props.story.id
        }}/>
        
        <td className="del-cell">
          <input type="button" onClick={this.onDelEvent.bind(this)} value="X" className="del-btn"/>
        </td>
        <td className="edit-cell">
          <input type="button" onClick={this.onSaveEvent.bind(this)} value="Save" className="save-btn"/>
        </td>
      </tr>
    );

  }

}
class EditableCell extends Component {
 

  render() {
    return (
      <td>
        <input type='text' name={this.props.cellData.type} id={this.props.cellData.id} value={this.props.cellData.value} onChange={this.props.onStoryTableUpdate}/>
      </td>
    );

  } 

}*/

