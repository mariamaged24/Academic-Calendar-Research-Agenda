import React, { Component } from "react";
import { withRouter } from "react-router";
import SignUpHeader from "../components/SignUpHeader";
import { FormControl, Button } from "react-bootstrap";
import apis from "../api";

import { Link } from "react-router-dom";

class Skills extends Component {
  constructor(props) {
    super(props);
    this.state = { values: [] };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  createUI() {
    return this.state.values.map((el, i) => (
      <div className="DynamicInputs" key={i}>
        <FormControl
          class="pull-left"
          style={{ width: "20vh" }}
          value={el || ""}
          onChange={this.handleChange.bind(this, i)}
        />
        <Button
          style={{ height: "2.3em", width: "10em", fontSize: "1em" }}
          className="NormalText"
          variant="danger"
          onClick={this.removeClick.bind(this, i)}
        >
          Remove Skill
        </Button>
      </div>
    ));
  }

  handleChange(i, event) {
    let values = [...this.state.values];
    values[i] = event.target.value;
    this.setState({ values });
  }

  addClick() {
    this.setState((prevState) => ({ values: [...prevState.values, ""] }));
    for (let x = 0; x < this.state.values.length; x++) {
    }
  }

  removeClick(i) {
    let values = [...this.state.values];
    values.splice(i, 1);
    this.setState({ values });
    for (let x = 0; x < this.state.values.length; x++) {
    }
  }

  async handleSubmit(event) {
    localStorage.setItem("skills", JSON.stringify(this.state.values));
    await apis
      .createUser({
        FirstName: localStorage.getItem("first"),
        LastName: localStorage.getItem("last"),
        Email: localStorage.getItem("email"),
        Country: localStorage.getItem("country"),
        Password: localStorage.getItem("password"),
        University: localStorage.getItem("university"),
        FieldOfStudy: localStorage.getItem("study"),
        FieldOfResearch: localStorage.getItem("research"),
        Interests: JSON.parse(localStorage.getItem("interests")),
        Skills: this.state.values,
      })
      .then((res) => {
        localStorage.removeItem("first");
        localStorage.removeItem("last");
        localStorage.removeItem("email");
        localStorage.removeItem("country");
        localStorage.removeItem("password");
        localStorage.removeItem("university");
        localStorage.removeItem("study");
        localStorage.removeItem("research");
        localStorage.removeItem("interests");
        this.props.history.push("/");
      })
      .catch((err) => {
        this.props.history.push("/signup");
      });
  }

  render() {
    return (
      <div>
        <div className="WelcomePageBackground">
          <div>
            <SignUpHeader />
          </div>
          <div className="OuterFlexx">
            <div className="OuterSignUpp">
              <p className="Titles">Please enter your skills:</p>
              <div className="SignUpFlex">
                <div style={{ display: "inline-block" }}>
                  <form onSubmit={this.handleSubmit}>
                    {this.createUI()}
                    <Link to="/skills">
                      <Button
                        variant="success"
                        onClick={this.handleSubmit.bind(this)}
                        style={{
                          marginTop: "1em",
                          marginRight: "10px",
                          marginLeft: "2em",
                        }}
                      >
                        Finish SignUp
                      </Button>
                    </Link>
                    <Button
                      style={{ marginTop: "1em" }}
                      className="NormalText"
                      variant="secondary"
                      onClick={this.addClick.bind(this)}
                    >
                      Add Skill
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Skills);
