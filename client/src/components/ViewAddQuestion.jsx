import React, { Component } from 'react';
import { Modal, Button, InputGroup, FormControl } from "react-bootstrap";
import apis from "../api"

class ViewAddQuestion extends Component {
    state = {  
        add:false,
        field: "",
        title:"",
        body:""
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
        if(this.state.body!=="" && this.state.title!=="" && this.state.field!==""){
           this.addQuestion()
        }
    }

    async addQuestion(){
        await apis.createQuestion({
            AssociatedUser: localStorage.getItem('id'),
            Field: this.state.field,
            QuestionTitle: this.state.title,
            QuestionBody: this.state.body
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
          show={this.props.addquestions}
          onHide={this.handleClose}
        >
             <Modal.Header closeButton>
            <Modal.Title>New Question</Modal.Title>
          </Modal.Header>
            <div classNaame="SignUpFlex">
              <InputGroup className="mb-3">
                <InputGroup.Text id="inputGroup-sizing-default">
                  Question Title
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
                 Question Field
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
                 Question Body
                </InputGroup.Text>
                <FormControl
                name="body"
                onChange={(e) => this.handleChange(e)}
                value = {this.state.body}
                required
                as="textarea"
                  aria-label="Default"
                  aria-describedby="inputGroup-sizing-default"
                />
              </InputGroup>

              <Button style={{marginBottom:"0.5em", float:"right", marginRight:"0.5em"}} onClick={this.handleButton.bind(this)} Variant="primary">
                  Add Question
              </Button>
            </div>

        </Modal>
            </div>
        );
    }
}
 
export default ViewAddQuestion;