import React, { Component } from 'react';
import { Modal, Button, InputGroup, FormControl } from "react-bootstrap";
import apis from "../api"

class ViewEditQuestion extends Component {
    state = {  
        edit:false,
        id:this.props.question._id,
        field: this.props.question.Field,
        title:this.props.question.QuestionTitle,
        body:this.props.question.QuestionBody
    } 
    handleChange(e){
        this.setState({
            [e.target.name]: e.target.value
        })
       
    }

    handleButton(){
        if(this.state.body!=="" && this.state.title!=="" && this.state.field!==""){
           this.editQuestion()
        }
    }

    async editQuestion(){
        await apis.updateQuestion((this.state.id),{
            Field: this.state.field,
            QuestionTitle: this.state.title,
            QuestionBody: this.state.body
        }).then((res)=>{
            this.handleClose()
        }).catch((err)=>{
        })
    }
    
    handleClose = () => {
        this.props.onPopupClose(false);
      };

    render() { 
        return (
            <div>
                <Modal
          style={{ overflowY: "auto" }}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={this.props.editquestions}
          onHide={this.handleClose}
        >
<Modal.Header closeButton>
            <Modal.Title>Edit My Question</Modal.Title>
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
                 Done
              </Button>
            </div>

        </Modal>
            </div>
        );
    }
}
 
export default ViewEditQuestion;