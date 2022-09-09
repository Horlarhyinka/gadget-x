
import Alert from "react-bootstrap/Alert";
import { Component } from "react";

import "./styles/message.css";

class UploadMessage extends Component{
   
    constructor(props){
        super(props);
        this.props = props;
        this.reset = props.closeMessage
        
    }
    render(){
        let {Success, Failed, Pending, AlertOpen} = this.props.states;

        if(Pending){
            return AlertOpen && <Alert className="alertBox pending" variant="pending">
                <p>uploading...</p>
        <span onClick={this.reset}>x</span>
            </Alert>
        }
    
        if(Failed){return AlertOpen && <Alert className="alertBox failed" variant='failed'>
            
        <p>upload failed</p>
        <span onClick={this.reset}>x</span>
      </Alert>}
    
       if(Success){ return AlertOpen && <Alert className="alertBox success" variant='success'>
            
            <p>upload successful</p>
            <span onClick={this.reset}>x</span>
          </Alert>}
    }
    
}



        export {UploadMessage}