import React, { Component } from "react";
import {
  Modal,
  Button,
  InputGroup,
  FormControl,
  Form
} from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import apis from '../api'

class AddTaskPopUp extends Component {
  state = {
    AddTask: false,
    deadline: new Date(),
    earliest: new Date(),
    invalidDates: false,
    invalidDuration: false,
    invalidPriority: false,
    invalidTitle: false,
    priority:0,
    days:0,
    hours:0,
    title: "",
    description:""


  };

  async pushTask(){
    if(!this.state.invalidDates && !this.state.invalidDuration && !this.invalidPriority && !this.state.invalidTitle){
      await apis.addScheduledTask((localStorage.getItem('id')), {
        Title: this.state.title,
        Days: this.state.days,
        Hours: this.state.hours,
        Priority: this.state.priority,
        DueTime: this.state.deadline.toISOString(),
        EarliestDate: this.state.earliest.toISOString(),
        Description: this.state.description
      }).then((res)=>{
        this.handleClose()
      }).catch((err)=>{
      })
    }
  }
 
  
  
  setDeadline = (picked) => {
    this.setState({ deadline: picked });
  };

  setEarliest = (picked) => {
    this.setState({ earliest: picked });
  }

  handleShowAddTask = (status) => {
    this.handleClose();
    this.setState({ AddTask: status });
  };

  handleClose = () => {
    this.props.onPopupClose(false);
  };

  handleChange(e){
    this.setState({[e.target.name]: e.target.value})
    
    if(e.target.name==="priority"){
      if(this.state.deadline.getTime()<this.state.earliest.getTime()){
        this.setState({invalidDates: true})
      }
      else{
        this.setState({invalidDates: false})
      }
    if(e.target.value>10 || e.target.value<1){
      this.setState({invalidPriority: true})
    }
    else{
      this.setState({invalidPriority: false})
    }
  }
    
 

    if(e.target.name==="hours" ){
    if((this.state.days===0 && e.target.value===0) || this.state.days<0 || e.target.value<0){
      this.setState({invalidDuration: true})
    }
    else{
      this.setState({invalidDuration: false})
    }}

    if(e.target.name==="title"){
    if(e.target.value===""){
      this.setState({invalidTitle: true})
    }
    else{
      this.setState({invalidTitle: false})
    }}

  }

  render() {
    return (
      <div>
        <Modal
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={this.props.showAddTask}
          onHide={this.handleClose}
        >
          <Modal.Header closeButton>
            <Modal.Title>New Task</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="SignUpFlex">
              <InputGroup className="mb-3">
                <InputGroup.Text id="inputGroup-sizing-default">
                  Task Title
                </InputGroup.Text>
                <FormControl
                  name="title"
                  isInvalid = {this.state.invalidTitle}
                  value={this.state.title}
                  onChange={(e)=>this.handleChange(e)}
                  aria-label="Default"
                  aria-describedby="inputGroup-sizing-default"
                />
                <Form.Control.Feedback type="invalid">
                    Title cannot be empty.
                  </Form.Control.Feedback>
              </InputGroup>
              <InputGroup className="mb-3">
                <InputGroup.Text>Days | Hours</InputGroup.Text>
                <FormControl 
                name="days"
                min="0"
                value={this.state.days}
                onChange={(e)=>this.handleChange(e)}
                type="number" 
                aria-label="Days" />
                <FormControl 
                min="0"
                name="hours"
                value={this.state.hours}
                isInvalid = {this.state.invalidDuration}
                onChange={(e)=>this.handleChange(e)}
                type="number" 
                aria-label="Hours" />
                <Form.Control.Feedback type="invalid">
                    Days and Hours cannot be both 0.
                  </Form.Control.Feedback>
              </InputGroup>
              <InputGroup className="mb-3">
                <InputGroup.Text> Deadline</InputGroup.Text>
                <div className="myContainer">
                  <DatePicker
                    className="myDatePicker"
                    selected={this.state.deadline}
                    onChange={(e) => this.setDeadline(e)}
                    name="deadline"
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={20}
                    timeCaption="time"
                    dateFormat="MMMM d, yyyy h:mm aa"
                  />
                </div>
              </InputGroup>
              <InputGroup className="mb-3">
              <InputGroup.Text> Earliest Possible Beginning Date</InputGroup.Text>
                <div className="myContainer">
                  <DatePicker
                    className="myDatePicker"
                    selected={this.state.earliest}
                    isInvalid = {this.state.invalidDates}
                    onChange={(e) => this.setEarliest(e)}
                    name="earliest"
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={20}
                    timeCaption="time"
                    dateFormat="MMMM d, yyyy h:mm aa"
                  />
                   <Form.Control.Feedback type="invalid">
                    Deadline cannot be set before the earliest beginning date.
                  </Form.Control.Feedback>
                  
                </div>
               
              </InputGroup>
              <InputGroup className="mb-3">
                <InputGroup.Text id="inputGroup-sizing-default">
                  Priority: Min=10, Max=1
                </InputGroup.Text>
                <FormControl
                name="priority"
                value={this.state.priority}
                isInvalid = {this.state.invalidPriority}
                onChange = {(e)=>this.handleChange(e)}
                  type="number"
                  min="1"
                  max ="10"
                  step="1"
                  aria-label="Default"
                  aria-describedby="inputGroup-sizing-default"
                />
              </InputGroup>
              <InputGroup className="mb-3">
                <InputGroup.Text id="inputGroup-sizing-default">
                  Description
                </InputGroup.Text>
                <FormControl
                as="textarea"
                  onChange = {(e)=>this.handleChange(e)}
                  name="description"
                  value={this.state.description}
                  aria-label="Default"
                  aria-describedby="inputGroup-sizing-default"
                />
              </InputGroup>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
            <Button onClick={()=>this.pushTask()} variant="success">
              Schedule Task
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default AddTaskPopUp;
