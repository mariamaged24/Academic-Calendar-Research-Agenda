import React, { Component } from 'react';
import { Modal, Button, InputGroup, FormControl } from "react-bootstrap";
import apis from "../api"

class ViewEditResearch extends Component {
    state = {  
        edit:false,
        id:this.props.research._id,
        field: this.props.research.Field,
        title:this.props.research.ResearchTitle,
        background:this.props.research.ResearchBackground,
        abstract: this.props.research.ResearchAbstract
    } 

    handleChange(e){
        this.setState({
            [e.target.name]: e.target.value
        })
       
    }

    handleButton(){
        if(this.state.field!=="" && this.state.title!=="" && this.state.background!=="" && this.state.abstract!==""){
           this.editResearch()
        }
    }

    async editResearch(){
        await apis.updateResearch((this.state.id),{
            Field: this.state.field,
            ResearchTitle: this.state.title,
            ResearchBackground: this.state.background,
            ResearchAbstract: this.state.abstract
        }).then((res)=>{
            this.handleClose()
        }).catch((err)=>{
        })
    }
    
    handleClose = () => {
        this.props.onPopupClose(false);
      };

    render() { 
        return (<div>
            <Modal
      style={{ overflowY: "auto" }}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={this.props.editresearches}
      onHide={this.handleClose}
    >
<Modal.Header closeButton>
        <Modal.Title>Edit My Research</Modal.Title>
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
            value = {this.state.background}
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
            value = {this.state.abstract}
            required
            as="textarea"
              aria-label="Default"
              aria-describedby="inputGroup-sizing-default"
            />
          </InputGroup>

          <Button style={{marginBottom:"0.5em", float:"right", marginRight:"0.5em"}} onClick={this.handleButton.bind(this)} Variant="primary">
             Done
          </Button>
        </div>

    </Modal>
        </div>
        );
    }
}
 
export default ViewEditResearch;