import React, { Component } from "react";
import axios from 'axios';
import StoryTableRow from './StoryTableRow';


export default class StoryList extends Component {

  constructor(props) {
    super(props)
    this.state = {
      storys: []
    };
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

  DataTable() {
    return this.state.storys.map((res, i) => {
      return <StoryTableRow obj={res} key={i} />;
    });
  }


  render() {
    return (
      <div>
   
    {this.state.storys.map((person,i) => (
       <div className="history-contianer">
         <h5>{person.name} from {person.country} </h5> 
    <p key={i}>{person.story}</p>
    </div>
  ))}

      </div>);
  }
}