import React, { Component } from "react";
import { Card, Button } from "react-bootstrap";
import { withRouter } from "react-router";
import UserHeader from "../components/UserHeader";
import { Link } from "react-router-dom";
import { BsFillChatRightTextFill } from "react-icons/bs";
import ViewAnswersPopUp from "../components/ViewAnswersPopUp";
import apis from "../api";
class UserQuestions extends Component {
  state = {
    questionsAray: [],
    answersModal:{showAnswers: false, question:{Answers:[]}},
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

 

  async componentDidMount() {
    this.handleReload();
  }


  async handleReload() {
    if (!localStorage.getItem("token")) {
      this.props.history.push("/");
    }
    await apis.getUserQuestions(this.props.match.params.id).then((res) => {
      this.setState({ questionsAray: res.data.data });
    });
  }

  render() {
    return (
      <div className="questions-container">
       <UserHeader userid = {this.props.match.params.id} />

        <div className="OuterFlex">
          <ViewAnswersPopUp
            key={this.state.answersModal.question._id}
            answersArray={this.state.answersModal.question.Answers}
            questionId={this.state.answersModal.question._id}
            showAnswers={this.state.answersModal.showAnswers}
            onPopupClose={()=>this.handleShowAnswers(false, {Answers:[]})}
          ></ViewAnswersPopUp>
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
                      {question.AssociatedUser.FirstName +
                        " " +
                        question.AssociatedUser.LastName +
                        " " +
                       (this.timeSince(new Date(question.Posted))) +
                        " "}{" "}
                      ago
                    </p>
                  </Card.Body>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(UserQuestions);
