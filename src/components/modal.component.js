import React, { Component } from "react";
import CreateStory from './create-story.component';
import CreateStoryCaptcha from './create-story-captcha.component';
import '../sass/layout/layout.scss';
import { connect } from "react-redux";
import Login from "./login.component";


class Modal extends Component {

  render() {
    const { isLoggedIn, message } = this.props;
    let modal1;
    if (this.props.modaltype == 1) {
      isLoggedIn==true ? modal1= <CreateStory></CreateStory>:modal1=<Login></Login>;
    }
    else if (this.props.modaltype==2) {
        modal1=  <CreateStoryCaptcha></CreateStoryCaptcha>;
    }

    return (
      <div className={this.props.show ? "mymodal display-block" : "mymodal display-none"}>
        <section className="mymodal-main">
          <button className='close-modal' onClick={this.props.handleclose} >
               x
          </button>
            {modal1}
        </section>
    </div>

    );
  }
}

function mapStateToProps(state) {
  const { isLoggedIn } = state.auth;
  const { message } = state.message;
  return {
    isLoggedIn,
    message
  };
}

export default connect(mapStateToProps)(Modal);
