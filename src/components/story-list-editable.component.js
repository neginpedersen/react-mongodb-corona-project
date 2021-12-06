/*
import React, { Component } from 'react';
import axios from 'axios';
import EditStudent from './edit-student.component';
import Table from 'react-bootstrap/Table';


export default class StoryListEditable extends Component {

    constructor(props) {
        super(props);
        this.deleteStudent = this.deleteStudent.bind(this);
        this.state = {
            students: []
          };
    }

    componentDidMount() {
        axios.get('http://localhost:4000/students/')
          .then(res => {
            this.setState({
              students: res.data
            });
          })
          .catch((error) => {
            console.log(error);
          })
      }
    
      DataTable() {
        return this.state.students.map((res, i) => {
          return <EditStudent obj={res} key={i} />;
        });
      }

    deleteStudent() {
        axios.delete('http://localhost:4000/students/delete-student/' + this.props.obj._id)
            .then((res) => {
                console.log('Student successfully deleted!')
            }).catch((error) => {
                console.log(error)
            })
    }

    render() {
        return (
            <div className="table-wrapper">
                  <Table striped bordered hover>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Roll No</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {this.state.students.map((res, i) => {
          return <EditStudent obj={res} key={i} />;
        })}
      </tbody>
    </Table>
        
        </div>
     
        );
    }
}*/

import React, { Component } from 'react';
import axios from 'axios';


export default class StoryListEditable extends Component  {

  constructor(props) {
    super(props);

    //  this.state.products = [];
    this.state = {};
    this.state.filterText = "";
    this.state.products = [];
  }
  componentDidMount() {
    axios.get('http://localhost:4000/storys/',{ crossDomain: true })
      .then(res => {  
        this.setState({
          products: res.data
        });
      })
      .catch((error) => {
        console.log(error);
      })
  }

  handleUserInput(filterText) {
    this.setState({filterText: filterText});
  };

  handleRowSave(product) {
    console.log('hi there from Handleproducttable'+JSON.stringify(product));
   
    axios.put('http://localhost:4000/storys/update-story/' + product._id, product)
    .then((res) => {
      console.log(res.data)
      console.log('story successfully updated')
    }).catch((error) => {
      console.log(error)
    })
    
  };

  handleRowDel(product) {
    var index = this.state.products.indexOf(product);
    axios.delete('http://localhost:4000/storys/delete-story/' + product._id)
        .then((res) => {
            console.log('story successfully deleted!')
        }).catch((error) => {
            console.log(error)
        })
    this.state.products.splice(index, 1);
    this.setState(this.state.products);
  };

  handleAddEvent(evt) {
    var id = (+ new Date() + Math.floor(Math.random() * 999999)).toString(36);
    var product = {
      id: id,
      name: "",
      country: "",
      story: ""
      }
    this.state.products.push(product);
    this.setState(this.state.products);

  }

  handleProductTable(evt) {
    var item = {
      id: evt.target.id,
      country: evt.target.country,
      story: evt.target.story
    };
   


var products = this.state.products.slice();
  var newProducts = products.map(function(product) {

    for (var key in product) {
      if (key == item.name && product.id == item.id) {
        product[key] = item.value;

      }
    }
    return product;
  });
    this.setState({products:newProducts});
  //  console.log(this.state.products);
  };
  render() {

    return (
      <div>
        <SearchBar filterText={this.state.filterText} onUserInput={this.handleUserInput.bind(this)}/>
        <ProductTable onProductTableUpdate={this.handleProductTable.bind(this)} onRowAdd={this.handleAddEvent.bind(this)} onRowDel={this.handleRowDel.bind(this)} onRowSave={this.handleRowSave.bind(this)} products={this.state.products} filterText={this.state.filterText}/>
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

class ProductTable extends Component {

  render() {
    var onProductTableUpdate = this.props.onProductTableUpdate;
    var rowDel = this.props.onRowDel;
    var rowSave = this.props.onRowSave;
    var filterText = this.props.filterText;
    var product = this.props.products.map(function(product) {
      if (product.name.indexOf(filterText) === -1) {
        return;
      }
      return (<ProductRow onProductTableUpdate={onProductTableUpdate} product={product} onDelEvent={rowDel.bind(this)} onSaveEvent={rowSave.bind(this)} key={product.id}/>)
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
            {product}

          </tbody>

        </table>
      </div>
    );

  }

}

class ProductRow extends Component {
  onDelEvent() {
    this.props.onDelEvent(this.props.product);

  }
  onSaveEvent(){
    this.props.onSaveEvent(this.props.product);
  }
  render() {

    return (
      <tr className="eachRow">
        <EditableCell onProductTableUpdate={this.props.onProductTableUpdate} cellData={{
          "type": "name",
          value: this.props.product.name,
          id: this.props.product.id
        }}/>
        <EditableCell onProductTableUpdate={this.props.onProductTableUpdate} cellData={{
          type: "country",
          value: this.props.product.country,
          id: this.props.product.id
        }}/>
        <EditableCell onProductTableUpdate={this.props.onProductTableUpdate} cellData={{
          type: "story",
          value: this.props.product.story,
          id: this.props.product.id
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
        <input type='text' name={this.props.cellData.type} id={this.props.cellData.id} value={this.props.cellData.value} onChange={this.props.onProductTableUpdate}/>
      </td>
    );

  }

}

