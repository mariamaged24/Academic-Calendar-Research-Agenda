import React, { Component } from "react";
import { Card, Nav } from "react-bootstrap";
import PageHeader from "../components/PageHeader";
import { Link } from "react-router-dom";
import apis from "../api";
class ProfileHeader extends Component {
  state = {
    first: "",
    last: "",
    research: "",
    study: "",
    country: "",
    university: "",
    skills: [],
    interests: [],
  };

  async componentDidMount() {
    if (!localStorage.getItem("token")) {
      this.props.history.push("/");
    }
    await apis
      .getUserById(localStorage.getItem("id"))
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
            </Card.Text>
          </Card>
          <Nav justify variant="tabs" defaultActiveKey="/home">
            <Nav.Item>
              <Link style={{ textDecoration: "none" }} to="/profile">
                <Nav.Link style={{ color: "#464866" }} href="/profile">
                  Research
                </Nav.Link>
              </Link>
            </Nav.Item>

            <Nav.Item>
              <Link style={{ textDecoration: "none" }} to="/myquestions">
                <Nav.Link style={{ color: "#464866" }} href="/myquestions">
                  Questions
                </Nav.Link>
              </Link>
            </Nav.Item>

            <Nav.Item>
              <Link style={{ textDecoration: "none" }} to="/followers">
                <Nav.Link style={{ color: "#464866" }} href="/followers">
                  Followers
                </Nav.Link>
              </Link>
            </Nav.Item>

            <Nav.Item>
              <Link style={{ textDecoration: "none" }} to="/following">
                <Nav.Link style={{ color: "#464866" }} href="/following">
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

export default ProfileHeader;
