import React, { Component } from "react";
import covid2trans from '../images/covid2trans.png'; 
import virus3 from '../images/virus3.png'; 
import Footer from './footer.component'; 
import UserService from "../services/user.service";
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import Modal from './modal.component';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.Showmodal=this.Showmodal.bind(this);
    this.hideModal=this.hideModal.bind(this);
    this.state = {
      content: "",
      createstoryisopen:'',
      createcaptchastoryisopen:'',
      showstory:'',
      showstoryonetime: '',
      show:'',
      modaltype:''


    };
  }

  componentDidMount() {
   
    UserService.getPublicContent().then(
      response => {
        this.setState({
          content: response.data
        });
      },
      error => {
        this.setState({
          content:
            (error.response && error.response.data) ||
            error.message ||
            error.toString()
        });
      }
    );
  }



  componentWillUnmount() {
    // fix Warning: Can't perform a React state update on an unmounted component
    this.setState = (state,callback)=>{
        return;
    };
}


  Showmodal(e){
    // sharestory==1 ? this.setState({ showstory: true }):this.setState({ showstory: '' });
    // sharestory==2 ? this.setState({ showstoryonetime: true }):this.setState({ showstoryonetime: '' });
    console.log(e.target.value);
    this.setState({modaltype: e.target.value});
    this.setState({ show: true });

  }

  hideModal(){
    this.setState({ show: '' ,modaltype:''});
    console.log('close modal');

  }

 

  render() {
    return (
    <div>
          <div className="dark-blue">
                <div className="main-flex-cont">
                  <div className="left-text">
                    <b><h1>Did you know?</h1></b>
                    <h3>Corona killed more than 5 millions<br></br> and affected more than 10 milions in the world</h3>
                  </div>
                  <Image src={covid2trans} />
                </div>
                <div className="jsx-4183910149 top-banner-bottom-angle"><svg id="svg-triangle-top" viewBox="0 0 200 15" preserveAspectRatio="none" className="jsx-4183910149 svg-triangle"><polygon points="0,15 200,0 0,0" className="jsx-4183910149"></polygon></svg><div className="jsx-4183910149 top-banner-page-breaker"></div></div>
          </div>
          <div className="light-grey">
                <div className="main-flex-cont"> 
                <Image src={virus3}  />
                <div className="right-text">
                  <b><h1>How did corona affect you?</h1></b>
                  <h3>Do you want to tell us your sotry?</h3>
                </div>
              </div>
          </div>
          
          <div className='main-flex-cont main-page-share-cont'>
              <div className='white-cont'>
                <h3>Want to be come a member?</h3>  
                <Button variant="dark" size="lg" onClick={this.Showmodal} value='1' type="submit">Share your Story</Button>
              </div>  
              <div className='white-cont'>  
                <h3>Share a one time story?</h3>
                <Button variant="dark" onClick={this.Showmodal} size="lg" value='2' type="submit">Share your Story</Button>
              </div>  
          </div>  

          <Modal modaltype={this.state.modaltype} show={this.state.show} handleclose={this.hideModal}>
          <p>Modal</p>
        </Modal>
          <Footer></Footer>
    </div>  
    );
  }
}
