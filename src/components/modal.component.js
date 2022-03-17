import React, { Component } from "react";
import CreateStory from './create-story.component';
import CreateStoryCaptcha from './create-story-captcha.component';

import '../sass/layout/layout.scss';

export default class Modal extends Component {

  
   
    render() {
        return (
            <div className={this.props.show ? "mymodal display-block" : "mymodal display-none"}>
              <section className="mymodal-main">
              <button className='close-modal' onClick={this.props.handleclose} >
                  x
                </button>
                  {this.props.modaltype==1? <CreateStory></CreateStory> :<CreateStoryCaptcha></CreateStoryCaptcha> }
                
                
              </section>
            </div>
          );
    }
}
