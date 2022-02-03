import React, { Component } from "react";
import { FaBeer,FaLinkedinIn,FaPhoneAlt, FaMailBulk,FaFacebookF,FaHome,FaTwitter } from 'react-icons/fa';

export default class Footer extends Component {

   
    render() {
        return (
                    
       <div className='flex-cont-qoute dark-blue'>
               <ul className='footer-list'>
                   <li>contact us</li>
                   <li>About us</li>
                   <li><FaMailBulk /> neginpedersen@gmail.com</li>
               </ul>

               <ul className='footer-list'>
                  
                   <li><FaHome />https://dp-soft.dk</li>
                   <li><FaLinkedinIn /> linked in</li>
                   <li><FaFacebookF /> <FaTwitter /><FaInstagram /></li>

               </ul>


               <div className='quote-cont-light-grey'>
                    <div className='qoute'>“In order to write about life first you must live it.”</div>
                    <div className='writer'>Ernest Hemingway</div>
               </div>
        </div> 
        );
    }
}
