import React, { Component } from "react";
import { Card, Button } from "react-bootstrap";
import { withRouter } from "react-router";
import ProfileHeader from "../components/ProfileHeader";
import ViewAddResearch from "../components/ViewAddResearch";
import ViewEditResearch from "../components/ViewEditResearch";
import ViewComments from "../components/ViewComments";
import { Link } from "react-router-dom";
import apis from "../api";
class ProfilePage extends Component {
  state = {
    researchArray: [],
    commentsModal: { showComments: false, research: { Comments: [] } },
    editModal: { editResearch: false, research: {} },
    addResearch: false,
  };

  async componentDidMount() {
    this.handleReload();
  }

  handleShowComments = (status, research) => {
    this.setState({
      commentsModal: { showComments: status, research: research },
    });
  };

  handleEditResearch = (status, research) => {
    this.setState({ editModal: { editResearch: status, research: research } });
  };

  handleAddResearch = (status) => {
    this.setState({ addResearch: status });
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

  async deleteResearch(researchId) {
    await apis
      .deleteResearch(researchId)
      .then((res) => {
        this.handleReload();
      })
      .catch((err) => {
      });
  }

  async handleReload() {
    if (!localStorage.getItem("token")) {
      this.props.history.push("/");
    } else {
      await apis.getUserResearches(localStorage.getItem("id")).then((res) => {
        this.setState({ researchArray: res.data.data });
      });
    }
  }

  render() {
    return (
      <div>
        <ProfileHeader/>
        <div className="OuterFlex">
          <Button
            onClick={() => this.handleAddResearch(true)}
            style={{ marginTop: "0.5em" }}
            variant="outline-secondary"
          >
            Add New Research
          </Button>
          <ViewAddResearch
            addresearches={this.state.addResearch}
            onPopupClose={this.handleAddResearch}
          ></ViewAddResearch>
          <ViewComments
            key={this.state.commentsModal.research._id}
            commentsArrayy={this.state.commentsModal.research.Comments}
            researchId={this.state.commentsModal.research._id}
            showComments={this.state.commentsModal.showComments}
            onPopupClose={() =>
              this.handleShowComments(false, { Comments: [] })
            }
          ></ViewComments>
          <ViewEditResearch
            key={this.state.editModal.research._id}
            research={this.state.editModal.research}
            editresearches={this.state.editModal.editResearch}
            onPopupClose={() => this.handleEditResearch(false, "")}
          ></ViewEditResearch>
          {this.state.researchArray.map((research) => (
              <Card style={{ marginTop: "1em", width: "100vh" }}>
                <Card.Header>
                  {localStorage.getItem("first") +
                    " " +
                    localStorage.getItem("last")}{" "}
                  in the Field of {research.Field}{" "}
                </Card.Header>
                <Card.Body>
                  <Card.Title>{research.ResearchTitle}</Card.Title>
                  <Card.Subtitle>{research.ResearchBackground}</Card.Subtitle>
                  <Card.Text>{research.ResearchAbstract}</Card.Text>
                  <Button
                    onClick={() => this.handleShowComments(true, research)}
                    variant="primary"
                  >
                    View Comments
                  </Button>
                  <Button
                    style={{ marginTop: "0em", float: "right" }}
                    variant="secondary"
                    onClick={() => this.handleEditResearch(true, research)}
                  >
                    {" "}
                    Edit Research
                  </Button>{" "}
                </Card.Body>
                <Card.Footer className="text-muted">
                  Posted {this.timeSince(new Date(research.Posted))} ago
                  <Button
                    style={{ marginTop: "0em", float: "right" }}
                    onClick={() => this.deleteResearch(research._id)}
                    variant="danger"
                  >
                    Delete Research
                  </Button>
                </Card.Footer>
              </Card>
          ))}
        </div>
      </div>
    );
  }
}

export default withRouter(ProfilePage);
