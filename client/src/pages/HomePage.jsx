import React, { Component } from "react";
import PageHeader from "../components/PageHeader";
import ViewComments from "../components/ViewComments";
import { withRouter } from "react-router";
import { Card, Button } from "react-bootstrap";
import apis from "../api";

class HomePage extends Component {
  state = {
    followingResearch: [],
    commentsModal: { showComments: false, research: { Comments: [] } },
    editModal: { editReserch: false, research: {} },
  };

  async componentDidMount() {
    this.handleReload();
  }

  handleShowComments = (status, research) => {
    this.setState({
      commentsModal: { showComments: status, research: research },
    });
  };

  async handleReload() {
    if (!localStorage.getItem("token")) {
      this.props.history.push("/");
    }
    await apis.followingResearches(localStorage.getItem("id")).then((res) => {
      this.setState({ followingResearch: res.data.data.Following });
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
        <PageHeader />
        <div className="OuterFlex">
          <ViewComments
            key={this.state.commentsModal.research._id}
            commentsArrayy={this.state.commentsModal.research.Comments}
            researchId={this.state.commentsModal.research._id}
            showComments={this.state.commentsModal.showComments}
            onPopupClose={() =>
              this.handleShowComments(false, { Comments: [] })
            }
          ></ViewComments>
          {this.state.followingResearch.map((following) => (
            <div>
              {following.Researches.map((research) => (
                  <Card style={{ marginTop: "1em", width: "100vh" }}>
                    <Card.Header>
                      {following.FirstName +
                        " " +
                        following.LastName}{" "}
                      in the Field of {research.Field}{" "}
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
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default withRouter(HomePage);
