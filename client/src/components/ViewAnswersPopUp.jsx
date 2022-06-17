import React, { Component } from "react";
import { Modal, Button, Card, InputGroup, FormControl } from "react-bootstrap";
import apis from "../api";
import EditAnswer from "../components/EditAnswer";

class ViewAnswersPopUp extends Component {
  state = {
    Answers: false,
    answersArrayy: this.props.answersArray,
    body: "",
    editModal:{editAnswer: false, answer:{}}
  };

  showEditDelete(answerId) {
    if (answerId === localStorage.getItem("id")) {
      return true;
    } else {
      return false;
    }
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  async deletereaction(reactionId) {
    await apis
      .deleteReaction(reactionId)
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => {
      });
  }

  handleEditAnswer = (status, answer) => {
    this.setState({ editModal:{editAnswer: status, answer: answer }});
  };

  handleClose = () => {
    this.props.onPopupClose();
  };

  checkHelpful(helpful, id) {
    return helpful.includes(id);
  }

  async handleButton(boolean, id) {
    if (boolean) {
      await apis
        .isNotHelpful(id, { userId: localStorage.getItem("id") })
        .then((res) => {
          window.location.reload();
        })
        .catch((err) => {
        });
    } else {
      await apis
        .isHelpful(id, { userId: localStorage.getItem("id") })
        .then((res) => {
          window.location.reload();
        })
        .catch((err) => {
        });
    }
  }
  getHelpful(helpful) {
    if (helpful.length===0) {
      return 0;
    } else {
      return helpful.length;
    }
  }
  checkAnswer(){
    if(this.state.Body!==""){
      this.handleButtonAdd()
    }
  }
  async handleButtonAdd() {
    await apis
      .createReaction({
        AssociatedUser: localStorage.getItem("id"),
        Question: this.props.questionId,
        ReactionType: true,
        AnswerBody: this.state.body,
        Helpful: [],
      })
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => {
      });
  }

  timeSince(date) {

    var seconds = Math.floor((new Date() - date) / 1000);
  
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

  render() {
    return (
      <div>
        <Modal
          style={{ overflowY: "auto" }}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={this.props.showAnswers}
          onHide={this.handleClose}
        >
          <Modal.Header closeButton>
            <Modal.Title>Answers</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Card style={{ marginBottom: "0.5em" }}>
              <InputGroup className="mb-3">
                <InputGroup.Text id="inputGroup-sizing-default">
                  Answer Body
                </InputGroup.Text>
                <FormControl
                  name="body"
                  onChange={(e) => this.handleChange(e)}
                  value={this.state.body}
                  required
                  as="textarea"
                  aria-label="Default"
                  aria-describedby="inputGroup-sizing-default"
                />
              </InputGroup>

              <Button
                style={{
                  marginBottom: "0.5em",
                  float: "right",
                  marginRight: "0.5em",
                }}
                onClick={this.checkAnswer.bind(this)}
                Variant="primary"
              >
                Add New Answer
              </Button>
            </Card>
            <EditAnswer
              key={this.state.editModal.answer._id}
              answer={this.state.editModal.answer}
              type = {"Answer"}
              editAnswer={this.state.editModal.editAnswer}
              onPopupClose={() => this.handleEditAnswer(false, '')}
            ></EditAnswer>
            <div>
              {this.state.answersArrayy.map((answer) => (
                <Card style={{ marginBottom: "0.5em" }}>
                  <p style={{ whiteSpace: "nowrap", color: "#464866" }}>
                    Posted by{" "}
                    {answer.AssociatedUser.FirstName +
                      " " +
                      answer.AssociatedUser.LastName +
                      " " +
                      (this.timeSince(new Date(answer.Posted))) +
                      " "}{" "}
                    ago
                  </p>
                  <Card.Text>{answer.AnswerBody}</Card.Text>
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <p
                      style={{
                        whiteSpace: "nowrap",
                        merginLeft: "0.5",
                        marginBottom: "0.2em",
                        color: "green",
                      }}
                    >
                      {this.getHelpful(answer.Helpful)} Helpful
                    </p>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      width: "100%",
                    }}
                  >
                    {this.showEditDelete(answer.AssociatedUser._id) && (
                      <>
                        <Button
                          onClick={()=>this.handleEditAnswer(true, answer)}
                          variant="secondary"
                        >
                          Edit
                        </Button>
                        <Button
                          onClick={() => this.deletereaction(answer._id)}
                          variant="danger"
                        >
                          Delete
                        </Button>
                      </>
                    )}
                    <Button
                      style={{
                        width: "140px",
                        marginLeft: "auto",
                        marginRight: "0em",
                        justifyContent: "flex-end",
                      }}
                      variant="success"
                      onClick={() =>
                        this.handleButton(
                          this.checkHelpful(
                            answer.Helpful,
                            localStorage.getItem("id")
                          ),
                          answer._id
                        )
                      }
                    >
                      {this.checkHelpful(
                        answer.Helpful,
                        localStorage.getItem("id")
                      )
                        ? "Unhelpful"
                        : "Helpful"}
                    </Button>{" "}
                  </div>
                </Card>
              ))}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default ViewAnswersPopUp;
