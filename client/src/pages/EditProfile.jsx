import React, { Component } from "react";
import { withRouter } from "react-router";
import PageHeader from "../components/PageHeader";
import { InputGroup, FormControl, Button, Form } from "react-bootstrap";
import apis from "../api";

class EditProfile extends Component {
  state = {
    dbemail: "",
    oldemail: "",
    newemail: "",
    oldpassword: "",
    newpassword: "",
    reenter: "",
    research: "",
    skills: [],
    interests: [],
    mismatchPassword: false,
    Password: "",
    Email: "",
    Research: "",
    Skills:"",
    Interests:"",
    invalidEmail: false,
    wrongEmail: false,
  };

  createUISkills() {
    return this.state.skills.map((el, i) => (
      <div className="DynamicInputs" key={i}>
        <FormControl
          class="pull-left"
          style={{ width: "20vh" }}
          value={el || ""}
          onChange={this.handleChangeSkills.bind(this, i)}
        />
        <Button
          style={{ height: "2.3em", width: "10em", fontSize: "1em" }}
          className="NormalText"
          variant="danger"
          onClick={this.removeClickSkills.bind(this, i)}
        >
          Remove Interest
        </Button>
      </div>
    ));
  }

  handleChangeSkills(i, event) {
    let skills = [...this.state.skills];
    skills[i] = event.target.value;
    this.setState({ skills });
  }

  addClickSkills() {
    this.setState((prevState) => ({ skills: [...prevState.skills, ""] }));
  }

  removeClickSkills(i) {
    let skills = [...this.state.skills];
    skills.splice(i, 1);
    this.setState({ skills });
  }

  handleSubmitSkills(event) {
    localStorage.setItem("interests", JSON.stringify(this.state.skills));
    event.preventDefault();
    this.props.history.push("/skills");
  }

  createUI() {
    return this.state.interests.map((el, i) => (
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
          Remove Interest
        </Button>
      </div>
    ));
  }

  handleChange(i, event) {
    let interests = [...this.state.interests];
    interests[i] = event.target.value;
    this.setState({ interests });
  }

  addClick() {
    this.setState((prevState) => ({ interests: [...prevState.interests, ""] }));
  }

  removeClick(i) {
    let interests = [...this.state.interests];
    interests.splice(i, 1);
    this.setState({ interests });
  }

  handleSubmit(event) {
    localStorage.setItem("interests", JSON.stringify(this.state.interests));
    event.preventDefault();
    this.props.history.push("/skills");
  }

  handlePassChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
    if (e.target.name === "reenter") {
      if (this.state.newpassword !== e.target.value) {
        this.setState({ mismatchPassword: true });
      }
      if (this.state.newpassword === e.target.value) {
        this.setState({ mismatchPassword: false });
      }
    }
  }

  async handleEmail(e) {
    if (e.target.name === "oldemail") {
      if (this.state.dbemail !== e.target.value) {
        this.setState({ wrongEmail: true });
      } else {
        this.setState({ wrongEmail: false });
      }
    }
    if (e.target.name === "newmail") {
      await apis
        .checkEmail({
          Email: this.state.newemail,
        })
        .then((res) => {
          this.setState({ invalidEmail: false });
        })
        .catch((err) => {
          if (err.response.data.message === "Invalid Email") {
            this.setState({ invalidEmail: true });
          }
        });
    }
  }

  handleSaveEmail() {
    if (
      !this.state.invalidEmail &&
      !this.state.wrongEmail &&
      this.state.oldemail !== "" &&
      this.state.newemail !== ""
    ) {
      this.updateEmail();
    }
  }

  handleResearchChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleSaveResearch() {
    if (this.state.research !== "") {
      this.updateResearch();
    }
  }

  async updateEmail() {
    await apis
      .updateUser(localStorage.getItem("id"), {
        Email: this.state.newemail,
        FieldOfResearch: this.state.research,
        Skills: this.state.skills,
        Interests: this.state.interests,
      })
      .then((user) => {
        this.setState({ Email: "Changed" });
      })
      .catch((err) => {
        this.setState({ Email: "NotChanged" });
      });
  }

  async updateResearch() {
    await apis
      .updateUser(localStorage.getItem("id"), {
        Email: this.state.dbemail,
        FieldOfResearch: this.state.research,
        Skills: this.state.skills,
        Interests: this.state.interests,
      })
      .then((user) => {
        this.setState({ Research: "Changed" });
      })
      .catch((err) => {
        this.setState({ Research: "NotChanged" });
      });
  }

  async updateInterests() {
    await apis
      .updateUser(localStorage.getItem("id"), {
        Email: this.state.dbemail,
        FieldOfResearch: this.state.research,
        Skills: this.state.skills,
        Interests: this.state.interests,
      })
      .then((user) => {
        this.setState({ Interests: "Changed" });
      })
      .catch((err) => {
        this.setState({ Interests: "NotChanged" });
      });
  }

  async updateSkills() {
    await apis
      .updateUser(localStorage.getItem("id"), {
        Email: this.state.dbemail,
        FieldOfResearch: this.state.research,
        Skills: this.state.skills,
        Interests: this.state.interests,
      })
      .then((user) => {
        this.setState({Skills: "Changed" });
      })
      .catch((err) => {
        this.setState({ Skills: "NotChanged" });
      });
  }


  handleSavePassword() {
    if (
      !this.state.mismatchPassword &&
      this.state.oldpassword !== "" &&
      this.state.reenter !== "" &&
      this.state.newpassword !== ""
    ) {
      this.passChange();
    }
  }

  async componentDidMount() {
    await apis.getUserById(localStorage.getItem("id")).then((res) => {
      this.setState({
        dbemail: res.data.data.Email,
        research: res.data.data.FieldOfResearch,
        skills: res.data.data.Skills,
        interests: res.data.data.Interests,
      });
    });
  }

  async passChange() {
    await apis
      .changePassword(localStorage.getItem("id"), {
        oldPassword: this.state.oldpassword,
        newPassword: this.state.newpassword,
      })
      .then((res) => {
        this.setState({ Password: "Changed" });
      })
      .catch((err) => {
        this.setState({ Password: "NotChanged" });
      });
  }

  boolean() {
    return this.state.Password;
  }

  render() {
    return (
      <div>
        <div className="questions-container">
          <PageHeader />
          <div className="OuterFlex">
            <p
              style={{ marginTop: "1.5em", marginBottom: "0.5em" }}
              className="Titles"
            >
              Edit My Email:
            </p>
            <div className="SmallerFlex">
              <InputGroup className="mb-3">
                <InputGroup.Text id="inputGroup-sizing-default">
                  Old E-mail
                </InputGroup.Text>
                <FormControl
                  name="oldemail"
                  value={this.state.oldemail}
                  onChange={(e) => this.handleResearchChange(e)}
                  onBlur={(e) => this.handleEmail(e)}
                  isInvalid={this.state.wrongEmail}
                  aria-label="Default"
                  aria-describedby="inputGroup-sizing-default"
                />
                <Form.Control.Feedback type="invalid">
                  Your Old Email is incorrect.
                </Form.Control.Feedback>
              </InputGroup>
              <InputGroup className="mb-3">
                <InputGroup.Text id="inputGroup-sizing-default">
                  New E-mail
                </InputGroup.Text>
                <FormControl
                  name="newemail"
                  value={this.state.newemail}
                  onChange={(e) => this.handleResearchChange(e)}
                  onBlur={(e) => this.handleEmail(e)}
                  isInvalid={this.state.invalidEmail}
                  aria-label="Default"
                  aria-describedby="inputGroup-sizing-default"
                />
                <Form.Control.Feedback type="invalid">
                  This E-mail already has an account
                </Form.Control.Feedback>
              </InputGroup>
              {this.state.Email === "Changed" && (
                <p style={{ color: "green" }}>
                  Your Email has been successfully changed.
                </p>
              )}
              {this.state.Email === "NotChanged" && (
                <p style={{ color: "red" }}>Your Email could not be changed.</p>
              )}
              <Button
                className="NormalText"
                variant="primary"
                onClick={() => this.handleSaveEmail()}
              >
                Save New E-mail
              </Button>
            </div>
            <p
              style={{ marginTop: "1.5em", marginBottom: "0.5em" }}
              className="Titles"
            >
              Edit My Password:
            </p>
            <div className="SmallerFlex">
              <InputGroup className="mb-3" controlId="formBasicPassword">
                <InputGroup.Text id="inputGroup-sizing-default">
                  Old Password
                </InputGroup.Text>
                <FormControl
                  type="password"
                  name="oldpassword"
                  value={this.state.oldpassword}
                  onChange={(e) => this.handlePassChange(e)}
                  aria-label="Default"
                  aria-describedby="inputGroup-sizing-default"
                />
              </InputGroup>
              <InputGroup className="mb-3">
                <InputGroup.Text id="inputGroup-sizing-default">
                  New Password
                </InputGroup.Text>
                <FormControl
                  type="password"
                  name="newpassword"
                  value={this.state.newpassword}
                  onChange={(e) => this.handlePassChange(e)}
                  aria-label="Default"
                  aria-describedby="inputGroup-sizing-default"
                />
              </InputGroup>

              <InputGroup className="mb-3">
                <InputGroup.Text id="inputGroup-sizing-default">
                  Re-enter New Password
                </InputGroup.Text>
                <FormControl
                  type="password"
                  name="reenter"
                  value={this.state.reenter}
                  isInvalid={this.state.mismatchPassword}
                  onChange={(e) => this.handlePassChange(e)}
                  aria-label="Default"
                  aria-describedby="inputGroup-sizing-default"
                />
                <Form.Control.Feedback type="invalid">
                  Passowrds are not matching.
                </Form.Control.Feedback>
              </InputGroup>
              {this.state.Password === "Changed" && (
                <p style={{ color: "green" }}>
                  Your Password has been successfully changed.
                </p>
              )}
              {this.state.Password === "NotChanged" && (
                <p style={{ color: "red" }}>
                  Your Password could not be changed.
                </p>
              )}
              <Button
                onClick={() => this.handleSavePassword()}
                className="NormalText"
                variant="primary"
              >
                Save New Password
              </Button>
            </div>
            <p
              style={{ marginTop: "1.5em", marginBottom: "0.5em" }}
              className="Titles"
            >
              Edit My Field of Research:
            </p>
            <div className="SmallerFlex">
              <InputGroup className="mb-3">
                <InputGroup.Text id="inputGroup-sizing-default">
                  New Field of Research
                </InputGroup.Text>
                <FormControl
                  name="research"
                  value={this.state.research}
                  onChange={(e) => this.handleResearchChange(e)}
                  aria-label="Default"
                  aria-describedby="inputGroup-sizing-default"
                />
              </InputGroup>
              {this.state.Research === "Changed" && (
                <p style={{ color: "green" }}>
                  Your Field of Research has been successfully changed.
                </p>
              )}
              {this.state.Research === "NotChanged" && (
                <p style={{ color: "red" }}>
                  Your Field of Research could not be changed.
                </p>
              )}
              <Button
                className="NormalText"
                variant="primary"
                onClick={() => this.handleSaveResearch()}
              >
                Save New Field of Reserch
              </Button>
            </div>
            <p
              style={{ marginTop: "1.5em", marginBottom: "0.5em" }}
              className="Titles"
            >
              Edit My Interests:
            </p>
            <div className="SmallerFlex">
              <div style={{ display: "inline-block" }}>
                <form>
                  {this.createUI()}
                  {this.state.Interests === "Changed" && (
                <p style={{ color: "green" }}>
                  Your Interests has been successfully changed.
                </p>
              )}
              {this.state.Interests === "NotChanged" && (
                <p style={{ color: "red" }}>
                  Your Interests could not be changed.
                </p>
              )}
                    <Button
                      onClick={this.updateInterests.bind(this)}
                      style={{
                        marginTop: "1em",
                        marginRight: "10px",
                        marginLeft: "1em",
                      }}
                    >
                      Save New Interests
                    </Button>
                  <Button
                    style={{ marginTop: "1em" }}
                    className="NormalText"
                    variant="secondary"
                    onClick={this.addClick.bind(this)}
                  >
                    Add Interest
                  </Button>
                </form>
              </div>
            </div>
            <p
              style={{ marginTop: "1.5em", marginBottom: "0.5em" }}
              className="Titles"
            >
              Edit My Skills:
            </p>
            <div className="SmallerFlex">
            <div style={{ display: "inline-block" }}>
                  <form>
                    {this.createUISkills()}
                    {this.state.Skills === "Changed" && (
                <p style={{ color: "green" }}>
                  Your Skills has been successfully changed.
                </p>
              )}
              {this.state.Skills === "NotChanged" && (
                <p style={{ color: "red" }}>
                  Your Skills could not be changed.
                </p>
              )}
                    <Button onClick={this.updateSkills.bind(this)} style={{marginTop: "1em", marginRight: "10px", marginLeft: "1em" }}>
                    Save New Skills
                    </Button>
                    <Button style={{marginTop: "1em"}}
                      className="NormalText"
                      variant="secondary"
                      onClick={this.addClickSkills.bind(this)}
                    >
                      Add Interest
                    </Button>
                  </form>
                </div>
                </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(EditProfile);
