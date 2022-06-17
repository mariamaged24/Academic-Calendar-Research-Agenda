import React, { Component } from "react";
import { Card, Button, Nav } from "react-bootstrap";
import { withRouter } from "react-router";
import ProfileHeader from "../components/ProfileHeader";
import { Link } from "react-router-dom";
import { BsFillChatRightTextFill, BsDistributeVertical } from "react-icons/bs";
import ViewAnswersPopUp from "../components/ViewAnswersPopUp";
import ViewEditQuestion from "../components/ViewEditQuestion";
import ViewAddQuestion from "../components/ViewAddQuestion";
import apis from "../api";
class MyQuestions extends Component {
  state = {
    questionsAray: [],
    addQuestion: false,
    answersModal:{showAnswers: false, question:{Answers:[]}},
    editModal:{editQuestion: false, question:{}}
  };

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

  handleShowAnswers = (status, question) => {
    this.setState({ answersModal:{showAnswers:status, question:question} });
  };

  handleEditQuestion = (status, question) => {
    this.setState({ editModal:{editQuestion: status, question: question }});
  };

  handleAddQuestion = (status) => {
    this.setState({ addQuestion: status });
  };

  async componentDidMount() {
    this.handleReload();
  }

  async deleteQuestion(questionId) {
    await apis
      .deleteQuestion(questionId)
      .then((res) => {
        this.handleReload();
      })
      .catch((err) => {
      });
  }

  async handleReload() {
    if (!localStorage.getItem("token")) {
      this.props.history.push("/");
    }
    await apis.getUserQuestions(localStorage.getItem("id")).then((res) => {
      this.setState({ questionsAray: res.data.data });
    });
  }

  render() {
    return (
      <div className="questions-container">
        <ProfileHeader />

        <div className="OuterFlex">
          <Button
            onClick={() => this.handleAddQuestion(true)}
            style={{ marginTop: "0.5em" }}
            variant="outline-secondary"
          >
            Add New Question
          </Button>
          <ViewAnswersPopUp
            key={this.state.answersModal.question._id}
            answersArray={this.state.answersModal.question.Answers}
            questionId={this.state.answersModal.question._id}
            showAnswers={this.state.answersModal.showAnswers}
            onPopupClose={()=>this.handleShowAnswers(false, {Answers:[]})}
          ></ViewAnswersPopUp>
          <ViewEditQuestion
            key={this.state.editModal.question._id}
            question={this.state.editModal.question}
            editquestions={this.state.editModal.editQuestion}
            onPopupClose={() => this.handleEditQuestion(false, '')}
          ></ViewEditQuestion>
          <div className="grid-container">
            {this.state.questionsAray.map((question) => (
              <div key={question._id} className="grid-item">
                <Card key={question._id} style={{ width: "18rem" }}>
                  <Card.Header>{question.QuestionTitle}</Card.Header>
                  <Card.Body>
                    <Card.Title>{question.Field}</Card.Title>
                    <Card.Text style={{ fontSize: "20px" }}>
                      {question.QuestionBody}
                    </Card.Text>
                    <button
                      className="ButtonBasicColor"
                      onClick={() => this.handleShowAnswers(true, question)}
                      variant="info"
                    >
                      {" "}
                      <BsFillChatRightTextFill />
                      View Answers
                    </button>{" "}
                    <button
                      style={{ marginTop: "0.5em" }}
                      className="ButtonBasicColor"
                      onClick={() => this.handleEditQuestion(true, question)}
                      variant="info"
                    >
                      {" "}
                      <BsDistributeVertical />
                      Edit Question
                    </button>{" "}
                    <Button
                      style={{ marginTop: "0.5em" }}
                      onClick={() => this.deleteQuestion(question._id)}
                      variant="danger"
                    >
                      Delete Question
                    </Button>
                    <p
                      style={{
                        fontSize: "14px",
                        textAlign: "right",
                        marginBottom: "0px",
                        whiteSpace: "nowrap",
                        color: "#464866",
                      }}
                    >
                      Posted by {" "}
                      {localStorage.getItem("first") +
                        " " +
                        localStorage.getItem("last") +
                        " " +
                       (this.timeSince(new Date(question.Posted))) +
                        " "}{" "}
                      ago
                    </p>
                  </Card.Body>
                </Card>
              </div>
            ))}

            <ViewAddQuestion
              addquestions={this.state.addQuestion}
              onPopupClose={this.handleAddQuestion}
            ></ViewAddQuestion>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(MyQuestions);
