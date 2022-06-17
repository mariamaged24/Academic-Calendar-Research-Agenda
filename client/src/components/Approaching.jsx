import React, { Component } from "react";
import { Card, Button, Modal } from "react-bootstrap";
import apis from "../api";

class Approaching extends Component {
  state = {
    Approach: false,
    tasks: [],
    approachingTasks: [],
  };

  timeSince(date) {
    var seconds = Math.floor((date - new Date()) / 1000);

    var interval = seconds / 31536000;

    if (interval > 1) {
      return Math.floor(interval) + " years";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return Math.floor(interval) + " months";
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return Math.floor(interval) + " days";
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return Math.floor(interval) + " hours";
    }
    interval = seconds / 60;
    if (interval > 1) {
      return Math.floor(interval) + " minutes";
    }
    return Math.floor(seconds) + " seconds";
  }

  async componentDidMount() {
    await apis
      .getUserById(localStorage.getItem("id"))
      .then((res) => {
        this.setState({ tasks: res.data.data.Tasks }, () => this.filter());
      })
      .catch((err) => {
        console.log(err);
      });
  }

  filter() {
    this.setState(
      {
        approachingTasks: this.state.tasks.filter(
          (task) =>
           ( Math.floor(Date.parse(new Date(task.End)) - new Date()) /
              86400000 <=
            7) && ( Math.floor(Date.parse(new Date(task.End)) - new Date()) /
            86400000 >
          0)
        ),
      },
      console.log(this.state.approachingTasks, "approachhhh")
    );
  }

  handleShowApproaching = (status) => {
    this.handleClose();
    this.setState({ Approach: status });
  };

  handleClose = () => {
    this.props.onPopupClose(false);
  };

  render() {
    return (
      <Modal
        style={{ overflowY: "auto" }}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={this.props.showApproachings}
        onHide={this.handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>Tasks with Approaching Deadlines</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {this.state.approachingTasks.length === 0 && (
            <p
              style={{ color: "green", marginLeft: "13em", fontWeight: "bold" }}
            >
              No Approaching Deadlines
            </p>
          )}
          {this.state.approachingTasks.map((task) => (
            <Card>
              <Card.Header
                style={{
                  fontWeight: "bold",
                  fontSize: "30px",
                  color: "black",
                  fontStyle: "normal",
                }}
              >
                {task.Title}
              </Card.Header>
              <Card.Body>
                <p style={{ color: "red" }}>
                  <span
                    style={{
                      fontWeight: "bold",
                      fontSize: "20px",
                      color: "red",
                      fontStyle: "normal",
                    }}
                  >
                    Time Left:
                  </span>
                  <span> {this.timeSince(new Date(task.End))}</span>
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
                  <span>
                    {" "}
                    {new Date(task.End).toISOString().substring(0, 10)}
                  </span>
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
                    Description:
                  </span>
                  <span> {task.Description}</span>
                </p>
              </Card.Body>
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
export default Approaching;
