import React, { Component } from "react";
import apis from "../api";
import { Modal, Button, InputGroup, FormControl } from "react-bootstrap";

class EditComment extends Component {
  state = {
    edit: false,
    id: this.props.comment._id,
    body: this.props.comment.AnswerBody,
  };
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleButton() {
    if (this.state.body !== "") {
      this.editComment();
    }
  }

  componentDidMount() {
    this.setState({
      edit: false,
      id: this.props.comment._id,
      body: this.props.comment.AnswerBody,
    });
  }

  async editComment() {
    await apis
      .updateReaction(this.state.id, {
        AnswerBody: this.state.body,
      })
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => {
      });
  }

  handleClose = () => {
    this.props.onPopupClose();
  };

  render() {
    return (
      <div>
        <Modal
          style={{ overflowY: "auto" }}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={this.props.editComment}
          onHide={this.handleClose}
        >
          <Modal.Header closeButton>
            <Modal.Title>Edit My Comment</Modal.Title>
          </Modal.Header>
          <div classNaame="SignUpFlex">
            <InputGroup className="mb-3">
              <InputGroup.Text id="inputGroup-sizing-default">
                Comment Body
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
              onClick={this.handleButton.bind(this)}
              Variant="primary"
            >
              Done
            </Button>
          </div>
        </Modal>
      </div>
    );
  }
}

export default EditComment;