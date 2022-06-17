import React, { Component } from "react";
import { Card, Nav } from "react-bootstrap";
import PageHeader from "../components/PageHeader";
import { Link } from "react-router-dom";
import apis from "../api";
class UserHeader extends Component {
  state = {
    first: "",
    last: "",
    research: "",
    study: "",
    country: "",
    university: "",
    skills: [],
    interests: [],
    following: []
  };

  checkFollow(id){
    return this.state.following.includes(id)
  }

  async handleButton(boolean, id) {
    if(boolean){
      await apis
      .unfollowUser(localStorage.getItem("id"), { followingid: id })
      .then((res) => {
        this.handleReload()
        
      })
      .catch((err) => {
      });
    }
    else{
      await apis
      .followUser(localStorage.getItem("id"), { followingid: id })
      .then((res) => {
        this.handleReload()
      })
      .catch((err) => {
      });
    }

  }

  async componentDidMount() {
    if (!localStorage.getItem("token")) {
      this.props.history.push("/");
    }
    await apis
      .getUserById(this.props.userid)
      .then((user) => {
        this.setState({
          first: user.data.data.FirstName,
          last: user.data.data.LastName,
          research: user.data.data.FieldOfResearch,
          country: user.data.data.Country,
          university: user.data.data.University,
          skills: user.data.data.Skills,
          interests: user.data.data.Interests,
          study: user.data.data.FieldOfStudy,
        });
      })
      .catch((err) => {});
      await apis
      .getFollowers(localStorage.getItem("id"))
      .then((res) => {
        this.setState({ following: res.data.data.Following });
       
      })
      .catch((err) => {
      });
  }
  render() {
    return (
      <div>
        <PageHeader />
        <div className="ProfileWindow">
          <Card style={{ marginTop: "0.5em" }}>
            <Card.Title>{this.state.first + " " + this.state.last}</Card.Title>
            <Card.Subtitle
              style={{
                fontWeight: "bold",
                fontSize: "20px",
                color: "black",
                fontStyle: "normal",
              }}
            >
              {"Field of Research: " +
                this.state.research +
                " | " +
                this.state.country}
            </Card.Subtitle>
            <Card.Subtitle
              style={{
                fontWeight: "bold",
                fontSize: "20px",
                color: "black",
                fontStyle: "normal",
                marginTop: "0.5em",
              }}
            >
              {this.state.study + " | " + this.state.university}
            </Card.Subtitle>
            <Card.Text style={{ marginTop: "0.5em" }}>
              <p>
                <span
                  style={{
                    fontWeight: "bold",
                    fontSize: "20px",
                    color: "black",
                    fontStyle: "normal",
                  }}
                >
                  {" "}
                  Interests:
                </span>
                {this.state.interests.map((txt) => (
                  <span>{" " + txt + " . "}</span>
                ))}
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
                  Skills:
                </span>
                {this.state.skills.map((txt) => (
                  <span>{" " + txt + " . "}</span>
                ))}
              </p>
              <button
                onClick={() => this.handleButton(this.checkFollow(this.props.userid), this.props.userid)}
                style={{
                  marginRight: "0.5em",
                  marginBottom: "0.5em",
                  width: "20vh",
                  height: "5vh",
                  marginTop: "0.7em",
                  float:"right"
                }}
                className="ButtonBasicColor"
              >
               {this.checkFollow(this.props.userid)? "Unfollow":"Follow"}
              </button>
            </Card.Text>
          </Card>
          <Nav justify variant="tabs" defaultActiveKey="/home">
            <Nav.Item>
              <Link
                style={{ textDecoration: "none" }}
                to={"/user/" + this.props.userid}
              >
                <Nav.Link
                  style={{ color: "#464866" }}
                  href={"/user/" + this.props.userid}
                >
                  Research
                </Nav.Link>
              </Link>
            </Nav.Item>

            <Nav.Item>
              <Link
                style={{ textDecoration: "none" }}
                to={"/userquestions/" + this.props.userid}
              >
                <Nav.Link
                  style={{ color: "#464866" }}
                  href={"/userquestions/" + this.props.userid}
                >
                  Questions
                </Nav.Link>
              </Link>
            </Nav.Item>

            <Nav.Item>
              <Link
                style={{ textDecoration: "none" }}
                to={"/userfollowers/" + this.props.userid}
              >
                <Nav.Link
                  style={{ color: "#464866" }}
                  href={"/userfollowers/" + this.props.userid}
                >
                  Followers
                </Nav.Link>
              </Link>
            </Nav.Item>

            <Nav.Item>
              <Link
                style={{ textDecoration: "none" }}
                to={"/userfollowing/" + this.props.userid}
              >
                <Nav.Link
                  style={{ color: "#464866" }}
                  href={"/userfollowing/" + this.props.userid}
                >
                  Following
                </Nav.Link>
              </Link>
            </Nav.Item>
          </Nav>
        </div>
      </div>
    );
  }
}

export default UserHeader;
