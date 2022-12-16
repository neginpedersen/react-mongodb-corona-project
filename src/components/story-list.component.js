import React, { Component } from "react";
import axios from 'axios';
import StoryTableRow from './StoryTableRow';
import Pagination from './pagination.component';
import '../sass/main.scss';
import '../sass/pages/story-list.scss';
import covid2trans from '../images/covid2trans.png';
import Image from 'react-bootstrap/Image';



export default class StoryList extends Component {

  constructor(props) {
    super(props)
    var exampleItems = [...Array(150).keys()].map(i => ({ id: (i+1), name: 'Item ' + (i+1) }));
    this.state = {
      storys: [],
      exampleItems: exampleItems,
      pageOfItems: []
    };
    this.onChangePage = this.onChangePage.bind(this);

  }

  onChangePage(pageOfItems) {
    // update state with new page of items
    this.setState({ pageOfItems: pageOfItems });
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


   <div className="story-list-cont flex-cont-column light-grey">
                        {this.state.pageOfItems.map(item =>
                            <div key={item.id} className='story-container'>
                              <header>
                                    <div className='header-cont'>
                                          <div className='story-image'>  </div>
                                      <div className='image-writer-cont'>
                                          <div className='story-writer'> {item.name} </div>
                                          <div className='story-country'> {item.country} </div>
                                      </div>
                                    </div>
                              </header>
                              <div className='story-text'> {item.story}</div>
                              </div>

                        )}
<Pagination items={this.state.storys} onChangePage={this.onChangePage} />

      </div>);
  }
}