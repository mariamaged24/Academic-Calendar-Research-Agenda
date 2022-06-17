import React, { Component } from 'react';
import { Modal, Button, InputGroup, FormControl } from "react-bootstrap";
import apis from "../api"

class ViewAddResearch extends Component {
  state = {  
    add:false,
    field: "",
    title:"",
    background:"",
    abstract:""
} 

handleChange(e){
    this.setState({
        [e.target.name]: e.target.value
    })
   
}

handleClose = () => {
    this.props.onPopupClose(false);
  }; 

handleButton(){
    if(this.state.background!=="" && this.state.title!=="" && this.state.field!=="" && this.state.abstract!==""){
       this.addResearch()
    }
}

async addResearch(){
    await apis.createResearch({
        AssociatedUser: localStorage.getItem('id'),
        Field: this.state.field,
        ResearchTitle: this.state.title,
        ResearchBackground: this.state.background,
        ResearchAbstract: this.state.abstract,
    }).then((res)=>{
        this.handleClose()
    }).catch((err)=>{
    })
}

render() { 
    return (
        <div>
            <Modal
      style={{ overflowY: "auto" }}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={this.props.addresearches}
      onHide={this.handleClose}
    >
         <Modal.Header closeButton>
        <Modal.Title>New Research</Modal.Title>
      </Modal.Header>
        <div classNaame="SignUpFlex">
          <InputGroup className="mb-3">
            <InputGroup.Text id="inputGroup-sizing-default">
              Research Title
            </InputGroup.Text>
            <FormControl
              name="title"
              value = {this.state.title}
              onChange={(e) => this.handleChange(e)}
              required
              aria-label="Default"
              aria-describedby="inputGroup-sizing-default"
            />
          </InputGroup>

          <InputGroup className="mb-3">
            <InputGroup.Text id="inputGroup-sizing-default">
             Research Field
            </InputGroup.Text>
            <FormControl
            name="field"
            onChange={(e) => this.handleChange(e)}
            value = {this.state.field}
            required
              aria-label="Default"
              aria-describedby="inputGroup-sizing-default"
            />
          </InputGroup>

          <InputGroup className="mb-3">
            <InputGroup.Text id="inputGroup-sizing-default">
             Research Background
            </InputGroup.Text>
            <FormControl
            name="background"
            onChange={(e) => this.handleChange(e)}
            value = {this.state.body}
            required
              aria-label="Default"
              aria-describedby="inputGroup-sizing-default"
            />
          </InputGroup>

          <InputGroup className="mb-3">
            <InputGroup.Text id="inputGroup-sizing-default">
             Research Abstract
            </InputGroup.Text>
            <FormControl
            name="abstract"
            onChange={(e) => this.handleChange(e)}
            value = {this.state.body}
            required
            as="textarea"
              aria-label="Default"
              aria-describedby="inputGroup-sizing-default"
            />
          </InputGroup>

          <Button style={{marginBottom:"0.5em", float:"right", marginRight:"0.5em"}} onClick={this.handleButton.bind(this)} Variant="primary">
              Add Research
          </Button>
        </div>

    </Modal>
        </div>
    );
}
}
 
export default ViewAddResearch;