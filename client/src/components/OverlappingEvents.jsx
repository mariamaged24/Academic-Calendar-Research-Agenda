import React, { Component } from "react";
import {
  Card,
  Button,
  Modal,
} from "react-bootstrap";
import apis from "../api";

class OverlappingEvents extends Component {
  state = {
    Suggestion: false,
    overlap: [],
  };
  componentDidMount() {
this.handleReload()
  }
 async handleReload(){
  await apis
  .getUserById(localStorage.getItem("id"))
  .then((res) => {
    this.setState({ overlap: res.data.data.Overlapping });
  })
  .catch((err) => {
  });
  }
  handleShowSuggestions = (status) => {
    this.handleClose();
    this.setState({ Suggestion: status });
  };

  handleClose = () => {
    this.props.onPopupClose(false);
  };

  async handleDelete(taskid){
    await apis.removeOverlap((localStorage.getItem('id')),{
      id: taskid
    }).then((res)=>{
      this.handleReload()
    }).catch((err)=>{
      console.log(err)
    })
  }

  render() {
    return (
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={this.props.showSuggestions}
        onHide={this.handleClose}
      ><Modal.Header closeButton>
        <Modal.Title>Overlapping Events</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {this.state.overlap.length === 0 && (
            <p
              style={{ color: "green", marginLeft: "13em", fontWeight: "bold" }}
            >
              No Overlapping Events
            </p>
          )}
           {this.state.overlap.map((task) => ( 
          <Card>
            <Card.Header   style={{
                    fontWeight: "bold",
                    fontSize: "30px",
                    color: "black",
                    fontStyle: "normal",
                  }}>{task.Title}</Card.Header>
            <Card.Body>
              <p>
                <span
                  style={{
                    fontWeight: "bold",
                    fontSize: "20px",
                    color: "black",
                    fontStyle: "normal",
                  }}
                >
                  Earliest Begin Date:
                </span>
                <span> {(new Date(task.EarliestDate)).toISOString().substring(0, 10)}</span>
              </p>
              <p>
                <span
                  style={{
                    fontWeight: "bold",
                    fontSize: "20px",
                    color: "black",
                    fontStyle: "normal",
                  }}
                >
                  Deadline:
                </span>
                <span> {(new Date(task.DueTime)).toISOString().substring(0, 10)}</span>
              </p>
              <p>
                <span
                  style={{
                    fontWeight: "bold",
                    fontSize: "20px",
                    color: "black",
                    fontStyle: "normal",
                  }}
                >
                 Priority:
                </span>
                <span> {task.Priority}</span>
              </p>
              <p>
                <span
                  style={{
                    fontWeight: "bold",
                    fontSize: "20px",
                    color: "black",
                    fontStyle: "normal",
                  }}
                >
                  Needed Duration:
                </span>
                <span> {task.Days} days and {task.Hours} Hours</span>
              </p>
              <p>
                <span
                  style={{
                    fontWeight: "bold",
                    fontSize: "20px",
                    color: "black",
                    fontStyle: "normal",
                  }}
                >
                  Description:
                </span>
                <span> {task.Description}</span>
              </p>
            </Card.Body>
            <Button
            onClick={()=>this.handleDelete(task.TaskId)}
            style={{float:"right"}}
                          variant="danger"
                        >
                          Delete
                        </Button>
          </Card>
           ))} 
           <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
            </Modal.Footer>
        </Modal.Body>
        
      </Modal>
    );
  }
}
export default OverlappingEvents;
