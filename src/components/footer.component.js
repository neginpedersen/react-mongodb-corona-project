import React, { Component } from "react";

export default class Footer extends Component {

   
    render() {
        return (
                    
       <div className='flex-cont-qoute'>
           <ul className='footer-list'>
               <li>contact us</li>
               <li>About us</li>
               <li>face book</li>
           </ul>
           <div className='quote-cont'>
                <div className='qoute'>“In order to write about life first you must live it.”</div>
                <div className='writer'>Ernest Hemingway</div>
           </div>
       </div>
        );
    }
}
