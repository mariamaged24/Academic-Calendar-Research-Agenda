import React, { Component } from "react";
import { withRouter } from "react-router";
import SignUpHeader from "../components/SignUpHeader";
import apis from "../api";
import { InputGroup, FormControl, Button, Form } from "react-bootstrap";

class SignUp extends Component {
  handleText(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
    if (e.target.name === "first") {
      if (!/^[a-zA-Z]*$/g.test(e.target.value)) {
        this.setState({ invalidFirst: true });
      } else {
        this.setState({ invalidFirst: false });
      }
    }
    if (e.target.name === "last") {
      if (!/^[a-zA-Z]*$/g.test(e.target.value)) {
        this.setState({ invalidLast: true });
      } else {
        this.setState({ invalidLast: false });
      }
    }
    if (e.target.name === "country") {
      if (!/^[a-zA-Z]*$/g.test(e.target.value)) {
        this.setState({ invalidCountry: true });
      } else {
        this.setState({ invalidCountry: false });
      }
    }
    if (e.target.name === "university") {
      if (!/^[a-zA-Z]*$/g.test(e.target.value)) {
        this.setState({ invalidUniversity: true });
      } else {
        this.setState({ invalidUniversity: false });
      }
    }
    if(e.target.name==="reenter"){
      if(this.state.password!==e.target.value){
        this.setState({mismatchPassword:true})
      }
      if(this.state.password===e.target.value){
        this.setState({mismatchPassword:false})
      }
    }
  }

  handleNext() {
    if (
      !this.state.invalidName &&
      !this.state.invalidCountry &&
      !this.state.invalidEmail &&
      !this.state.invalidUniversity &&
      !this.state.mismatchPassword &&
      this.state.first!=="" &&
      this.state.last!=="" &&
      this.state.email!=="" &&
      this.state.country!=="" &&
      this.state.study!=="" &&
      this.state.research!=="" &&
      this.state.password!=="" &&
      this.state.reenter!=="" &&
      this.state.university!=="" 
    ) {
      localStorage.setItem("first", this.state.first);
      localStorage.setItem("last", this.state.last);
      localStorage.setItem("country", this.state.country);
      localStorage.setItem("email", this.state.email);
      localStorage.setItem("university", this.state.university);
      localStorage.setItem("study", this.state.study);
      localStorage.setItem("research", this.state.research);
      localStorage.setItem("password", this.state.password);
      this.props.history.push('/interests')
    }
  }

  async handleEmail(e){
    this.setState({
      [e.target.name]: e.target.value,
    });
await apis.checkEmail({
  Email: this.state.email
}).then((res)=>{
  this.setState({invalidEmail:false})
})
.catch((err)=>{
  if(err.response.data.message==="Invalid Email"){
    this.setState({invalidEmail:true})
}
})
  }

  state = {
    invalidFirst: false,
    invalidLast: false,
    invalidCountry: false,
    invalidEmail: false,
    invalidUniversity: false,
    mismatchPassword: false,
    first: "",
    last: "",
    country: "",
    email: "",
    university: "",
    study: "",
    research: "",
    password: "",
    reenter: "",
  };

  render() {
    return (
      <div className="questions-container">
        <div className="WelcomePageBackground">
          <div>
            <SignUpHeader />
          </div>

          <div className="OuterFlexx">
            <div className="OuterSignUp">
              <div classNaame="SignUpFlex">
                <p className="Titles">
                  Please enter the following information:
                </p>

                <InputGroup hasValidation className="mb-3">
                  <InputGroup.Text className="NormalText">
                    First Name | Last Name
                  </InputGroup.Text>
                  <FormControl
                    aria-label="First name"
                    name="first"
                    onkeydown="return /[a-z]/i.test(event.key)"
                    required
                    isInvalid={this.state.invalidFirst}
                    value={this.state.first}
                    onChange={(e) => this.handleText(e)}
                  />
                  <FormControl
                    aria-label="Last name"
                    name="last"
                    required
                    isInvalid={this.state.invalidLast}
                    value={this.state.last}
                    onChange={(e) => this.handleText(e)}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter a valid name.
                  </Form.Control.Feedback>
                </InputGroup>

                <InputGroup className="mb-3">
                  <InputGroup.Text className="NormalText">
                    Country
                  </InputGroup.Text>
                  <FormControl
                    aria-label="Country"
                    name="country"
                    required
                    isInvalid={this.state.invalidCountry}
                    value={this.state.country}
                    onChange={(e) => this.handleText(e)}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter a valid country.
                  </Form.Control.Feedback>
                </InputGroup>

                <InputGroup className="mb-3">
                  <InputGroup.Text id="inputGroup-sizing-default">
                    E-mail
                  </InputGroup.Text>
                  <FormControl
                    aria-label="Email"
                    type="email"
                    name="email"
                    required
                    isInvalid={this.state.invalidEmail}
                    value={this.state.email}
                    onChange={(e) => this.handleText(e)}
                    onBlur={(e) => this.handleEmail(e)}
                    aria-describedby="inputGroup-sizing-default"
                  />
                   <Form.Control.Feedback type="invalid">
                    This email already has an account.
                  </Form.Control.Feedback>
                </InputGroup>

                <InputGroup className="mb-3">
                  <InputGroup.Text className="NormalText">
                    University | Field of Study
                  </InputGroup.Text>
                  <FormControl
                    aria-label="University"
                    name="university"
                    required
                    isInvalid={this.state.invalidUniversity}
                    value={this.state.university}
                    onChange={(e) => this.handleText(e)}
                  />
                  <FormControl
                    aria-label="FieldOfStudy"
                    name="study"
                    required
                    value={this.state.study}
                    onChange={(e) => this.handleText(e)}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter a valid university.
                  </Form.Control.Feedback>
                </InputGroup>

                <InputGroup className="mb-3">
                  <InputGroup.Text className="NormalText">
                    Field of Research
                  </InputGroup.Text>
                  <FormControl
                    aria-label="Country"
                    name="research"
                    required
                    value={this.state.research}
                    onChange={(e) => this.handleText(e)}
                  />
                </InputGroup>

                <InputGroup className="mb-3" controlId="formBasicPassword">
                  <InputGroup.Text id="inputGroup-sizing-default">
                    Password
                  </InputGroup.Text>
                  <FormControl
                    type="password"
                    name="password"
                    required
                    value={this.state.password}
                    onChange={(e) => this.handleText(e)}
                    aria-label="Default"
                    aria-describedby="inputGroup-sizing-default"
                  />
                </InputGroup>

                <InputGroup className="mb-3" controlId="formBasicPassword">
                  <InputGroup.Text id="inputGroup-sizing-default">
                    Re-enter Password
                  </InputGroup.Text>
                  <FormControl
                    type="password"
                    name="reenter"
                    required
                    isInvalid={this.state.mismatchPassword}
                    value={this.state.reenter}
                    onChange={(e) => this.handleText(e)}
                    aria-label="Default"
                    aria-describedby="inputGroup-sizing-default"
                  />
                  <Form.Control.Feedback type="invalid">
                    Passowrds are not matching.
                  </Form.Control.Feedback>
                </InputGroup>

                <div className="RightButtons">
                  <Button
                    onClick={this.handleNext.bind(this)}
                    variant="primary"
                  >
                    Next
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(SignUp);
