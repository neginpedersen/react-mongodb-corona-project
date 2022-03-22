import React, { Component } from "react";
import axios from 'axios';
import StoryTableRow from './StoryTableRow';
import Pagination from './pagination.component';

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
      <div>

   <div className="container">
                    <div className="text-center">

                        {this.state.pageOfItems.map(item =>
                            <div key={item.id}> name: {item.name} from:  {item.country} wrote: {item.story}</div>

                        )}
                        <Pagination items={this.state.storys} onChangePage={this.onChangePage} />
                    </div>
                </div>
      </div>);
  }
}