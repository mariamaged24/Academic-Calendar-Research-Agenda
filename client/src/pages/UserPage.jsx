import React, { Component } from "react";
import { Card, Button } from "react-bootstrap";
import { withRouter } from "react-router";
import UserHeader from "../components/UserHeader";
import ViewComments from "../components/ViewComments";
import { Link } from "react-router-dom";
import apis from "../api";
class UserPage extends Component {
  state = {
    researchArray: [],
    commentsModal: { showComments: false, research: { Comments: [] } },
  };

  async componentDidMount() {
    this.handleReload();
  }

  handleShowComments = (status, research) => {
    this.setState({
      commentsModal: { showComments: status, research: research },
    });
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

  

  async handleReload() {
    if (!localStorage.getItem("token")) {
      this.props.history.push("/");
    } else {
      await apis.getUserResearches(this.props.match.params.id).then((res) => {
        this.setState({ researchArray: res.data.data });
      });
    }
  }

  render() {
    return (
      <div>
        <UserHeader userid = {this.props.match.params.id} />
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
          {this.state.researchArray.map((research) => (
              <Card style={{ marginTop: "1em", width: "100vh" }}>
                <Card.Header>
                  {research.AssociatedUser.FirstName +
                    " " +
                    research.AssociatedUser.LastName}{" "}
                  in the Field of {research.Field}{" "}
                </Card.Header>
                <Card.Body>
                  <Card.Title>{research.ResearchTitle}</Card.Title>
                  <Card.Subtitle>{research.ResearchBackground}</Card.Subtitle>
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
      </div>
    );
  }
}

export default withRouter(UserPage);
