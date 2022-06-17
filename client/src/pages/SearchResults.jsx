import React, { Component } from "react";
import { withRouter } from "react-router";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import apis from "../api";
import PageHeader from "../components/PageHeader";
import ViewAnswersPopUp from "../components/ViewAnswersPopUp";
import ViewComments from "../components/ViewComments";
class SearchResults extends Component {
  state = {
    users: [],
    allUsers:[],
    questions: [],
    allQuestions:[],
    researches: [],
    allResearches:[], 
    following:[],
    answersModal:{showAnswers: false, question:{Answers:[]}},
    commentsModal: { showComments: false, research: { Comments: [] } },
  };
  handleShowComments = (status, research) => {
    this.setState({
      commentsModal: { showComments: status, research: research },
    });
  };
  checkFollow(id){
    return this.state.following.includes(id)
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

  async mySearch(){
    await apis
      .getAllQuestions()
      .then((res) => {
        this.setState({ allQuestions: res.data.data }, () => {
          this.getFilter("questions");
        });
      })
      .catch((err) => {
      });
    await apis
      .getAllResearches()
      .then((res) => {
        this.setState({ allResearches: res.data.data }, () => {
          this.getFilter("researches");
        });
      })
      .catch((err) => {
      });
    await apis
      .getAllUsers()
      .then((res) => {
        this.setState({allUsers: res.data.data }, () => {
          this.getFilter("users");
        });
      })
      .catch((err) => {
      });

      await apis
      .getFollowers(localStorage.getItem("id"))
      .then((res) => {
        this.setState({ following: res.data.data.Following });
       
      })
      .catch((err) => {
      });
  }

  handleShowAnswers = (status, question) => {
    this.setState({ answersModal:{showAnswers:status, question:question} });
  };


  async handleButton(boolean, id) {
    if(boolean){
      await apis
      .unfollowUser(localStorage.getItem("id"), { followingid: id })
      .then((res) => {
        window.location.reload()
        
      })
      .catch((err) => {
      });
    }
    else{
      await apis
      .followUser(localStorage.getItem("id"), { followingid: id })
      .then((res) => {
        window.location.reload()
      })
      .catch((err) => {
      });
    }

  }
  async componentDidMount() {
    if (!localStorage.getItem("token")) {
      this.props.history.push("/");
    }
    this.mySearch()
  }

  getFilter(type) {
      let searchKey = localStorage.getItem("search")
    if (type === "users") {
      this.setState({
        users: this.state.allUsers.filter((user) => 
          (user.FirstName.toLowerCase().includes(
            searchKey.toLowerCase()
          )) ||
            (user.LastName.toLowerCase().includes(
                searchKey.toLowerCase()
            ))
        ),
      });
    }
    if (type === "questions") {
        this.setState({
          questions: this.state.allQuestions.filter((question) => 
            (question.Field.toLowerCase().includes(
                searchKey.toLowerCase()
            )) ||
              (question.QuestionTitle.toLowerCase().includes(
                searchKey.toLowerCase()
              )) ||
              (question.QuestionBody.toLowerCase().includes(
                searchKey.toLowerCase()
              ))
          ),
        });
      }

      if (type === "researches") {
        this.setState({
            researches: this.state.allResearches.filter((research) => 
            (research.Field.toLowerCase().includes(
                searchKey.toLowerCase()
            )) ||
              (research.ResearchTitle.toLowerCase().includes(
                searchKey.toLowerCase()
              )) ||
              (research.ResearchAbstract.toLowerCase().includes(
                searchKey.toLowerCase()
              ))
          ),
        });
      }
    
  }

  render() {
    return (
      <div style={{overflowY: "scroll"}}>
        <div className="search-container">
          <PageHeader parentFunction={this.mySearch.bind(this)}/>
          <ViewAnswersPopUp
            key={this.state.answersModal.question._id}
            answersArray={this.state.answersModal.question.Answers}
            questionId={this.state.answersModal.question._id}
            showAnswers={this.state.answersModal.showAnswers}
            onPopupClose={()=>this.handleShowAnswers(false, {Answers:[]})}
          ></ViewAnswersPopUp>
             <ViewComments
            key={this.state.commentsModal.research._id}
            commentsArrayy={this.state.commentsModal.research.Comments}
            researchId={this.state.commentsModal.research._id}
            showComments={this.state.commentsModal.showComments}
            onPopupClose={() =>
              this.handleShowComments(false, { Comments: [] })
            }
          ></ViewComments>
          <div>
            <p
              style={{
                marginTop: "2em",
                marginLeft: "13em",
                fontWeight: "bold",
                fontSize: "30px",
                color: "black",
                fontStyle: "normal",
              }}
            >
              Users:
            </p>
            <div
              style={{ marginTop: "0.5em", marginLeft: "13em" }}
              className="OuterSignUp"
            >
              <div className="SignUpFlex">
              {this.state.users.length===0 && (
    <p
      style={{
        fontWeight: "bold",
        fontSize: "30px",
        color: "black",
        fontStyle: "normal",
      }}
    >
      No Users to Show
    </p>
  )}
              {this.state.users.map( user => (
            <div className="DynamicInputs">
              <Card
                style={{
                  width: "360px",
                  height: "90px",
                  marginBottom: "1em",
                }}
              >
                <Card.Body style={{ marginTop: "-0.3em" }}>
                  <Card.Title style={{ fontSize: "18px" }}>
                  <Link style={{ textDecoration: "none", color:'black' }} to={'/user/'+user._id }>
                    {user.FirstName + " " + user.LastName}
                    </Link>
                  </Card.Title>
                  <Card.Subtitle
                    className="mb-2 text-muted"
                    style={{ fontSize: "14px" }}
                  >
                    {user.FieldOfStudy + " | " + user.University}
                  </Card.Subtitle>
                </Card.Body>
              </Card>

              {user._id!==localStorage.getItem('id') && <button
                onClick={() => this.handleButton(this.checkFollow(user._id), user._id)}
                style={{
                  marginLeft: "0.5em",
                  width: "20vh",
                  height: "5vh",
                  marginTop: "0.7em",
                }}
                className="ButtonBasicColor"
              >
               {this.checkFollow(user._id)? "Unfollow":"Follow"}
              </button>}
              {user._id===localStorage.getItem('id') && 
              <Link to="/profile">
              <button
                onClick={() => this.handleButton(this.checkFollow(user._id), user._id)}
                style={{
                  marginLeft: "0.5em",
                  width: "20vh",
                  height: "5vh",
                  marginTop: "0.7em",
                }}
                className="ButtonBasicColor"
              >
               My profile
              </button></Link>}
            </div>
          ))}
              </div>
            </div>
          </div>

          <div>
            <p
              style={{
                marginTop: "2em",
                marginLeft: "13em",
                fontWeight: "bold",
                fontSize: "30px",
                color: "black",
                fontStyle: "normal",
              }}
            >
              Questions:
            </p>
            
            <div
              style={{ marginTop: "0.5em", marginLeft: "13em" }}
              className="OuterSignUp"
            >
              <div className="SignUpFlex">
              {this.state.questions.length===0 && (
    <p
      style={{
        fontWeight: "bold",
        fontSize: "30px",
        color: "black",
        fontStyle: "normal",
      }}
    >
      No Questions to Show
    </p>
  )}
              {this.state.questions.map((question) => (
                <div>
                  <Card style={{ marginTop: "1em", width: "100vh" }}>
                    <Card.Header>
                      {question.AssociatedUser.FirstName+
                        " " +
                        question.AssociatedUser.LastName}, {" "} {question.Field}{" "}
                    </Card.Header>
                    <Card.Body>
                      <Card.Title>{question.QuestionTitle}</Card.Title>
                      <Card.Text>{question.QuestionBody}</Card.Text>
                      <Button
                      style={{float:"right"}}
                        onClick={() => this.handleShowAnswers(true, question)}
                        variant="primary"
                      >
                        View Answers
                      </Button>
                    </Card.Body>
                    <Card.Footer className="text-muted">
                      Posted {this.timeSince(new Date(question.Posted))} ago
                    </Card.Footer>
                  </Card>
                </div>
              ))}
              </div>
            </div>
          </div>
          <div>
            <p
              style={{
                marginTop: "2em",
                marginLeft: "13em",
                fontWeight: "bold",
                fontSize: "30px",
                color: "black",
                fontStyle: "normal",
              }}
            >
              Research:
            </p>
            <div
              style={{ marginTop: "0.5em", marginLeft: "13em" }}
              className="OuterSignUp"
            >
              <div className="SignUpFlex">{this.state.researches.length===0 && (
    <p
      style={{
        fontWeight: "bold",
        fontSize: "30px",
        color: "black",
        fontStyle: "normal",
      }}
    >
      No Research to Show
    </p>
  )}
{this.state.researches.map((research) => (
  <div>
    <Card style={{ marginTop: "1em", width: "100vh" }}>
      <Card.Header>
        {research.AssociatedUser.FirstName +
          " " +
          research.AssociatedUser.LastName}{" "}
        , {research.Field}{" "}
      </Card.Header>
      <Card.Body>
        <Card.Title>{research.ResearchTitle}</Card.Title>
        <Card.Subtitle>
          {research.ResearchBackground}
        </Card.Subtitle>
        <Card.Text>{research.ResearchAbstract}</Card.Text>
        <Button
        style={{float:"right"}}
          onClick={() => this.handleShowComments(true, research)}
          variant="primary"
        >
          View Comments
        </Button>
      </Card.Body>
      <Card.Footer className="text-muted">
        Posted {this.timeSince(new Date(research.Posted))} ago
      </Card.Footer>
    </Card>
  </div>
))}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(SearchResults);

