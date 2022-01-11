// ======================================
//  Third File  created as View
// ======================================

import React, { Component } from 'react'
import {connect} from 'react-redux'

class Counter extends Component {
  render() {
    return <div>
        <div className=" row col-md-12">
          <h1 className="col-md-2">{this.props.counter}</h1>
          <div className="col-md-2">
            <button type="button" className="btn btn-primary" onClick={() => this.props.increment()}>
              Increment
            </button>
          </div>
          <div className="col-md-2">
            <button type="button" className="btn btn-primary" onClick={() => this.props.decrement()}>
              Decrement
            </button>
          </div>
        </div>
      </div>; 
  }
}

//this function will be used at initial stage get data from reducer file
const loadInitialValues = (state) =>{
    return { counter : state.counter };
}
//this function will be used action made
const callReducerAction = (dispatch) =>{
    return{
        increment : () =>{            
            dispatch({type : 'INC', add_plus : 1});
        },
        decrement:()=>{           
            dispatch({type : 'DEC', add_minus : 1});
        }
    }
}



export default connect(loadInitialValues, callReducerAction)(Counter);