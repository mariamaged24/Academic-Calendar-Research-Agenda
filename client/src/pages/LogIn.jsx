import React, { Component } from "react";
import { withRouter } from "react-router";
import { Nav, Form, Button } from "react-bootstrap";
import apis from "../api";

import { Link } from "react-router-dom";

class LogIn extends Component {
  handleText(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  async login() {
    await apis
      .loginUser({
        Email: this.state.email,
        Password: this.state.password,
      })
      .then((res) => {
        localStorage.setItem('token',res.data.token)
        localStorage.setItem('first',res.data.data.FirstName)
        localStorage.setItem('id',res.data.data._id)
        localStorage.setItem('last',res.data.data.LastName)

        this.props.history.push('/homepage')
      })
      .catch((err) => {
        if(err.response){
          if(err.response.data.message==="Invalid Email"){
              this.setState({invalidEmail:true})
          }
          else if(err.response.data.message==="Wrong Password"){
              this.setState({invalidPassword:true,invalidEmail:false})
          }
      }
      });
      
  }
  state = {
    invalidEmail:false,
    invalidPassword:false,
    email: "",
    password: "",
  };
  render() {
    return (
      <div>
        <div className="WelcomePageBackground">
          <div className="OuterFlex">
            <p className="TitleName">Research Arc </p>
            <div>
              <Form hasValidation className="InnerFlex">
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label className="NormalText">Email</Form.Label>
                  <Form.Control
                    className="NormalText"
                    placeholder="Enter Email"
                    type="email"
                    name="email"
                    required isInvalid={this.state.invalidEmail}
                    value={this.state.email}
                    onChange={(e) => this.handleText(e)}
                  />
                  <Form.Control.Feedback type="invalid" >
                        Email is not correct.
                     </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label className="NormalText">Password</Form.Label>
                  <Form.Control
                    className="NormalText"
                    type="password"
                    name="password"
                    required isInvalid={this.state.invalidPassword}
                    value={this.state.password}
                    placeholder="Enter Password"
                    onChange={(e) => this.handleText(e)}
                  />
                  <Form.Control.Feedback type="invalid" >
                       Password is not correct.
                     </Form.Control.Feedback>
                </Form.Group>
                <p className="NormalText">No Account?</p>
                <Link style={{ textDecoration: "none" }} to="/signup">
                  <Nav.Link className="NormalText" href="/signup">
                    {" "}
                    Sign Up{" "}
                  </Nav.Link>
                </Link>

                <Button onClick={this.login.bind(this)} variant="primary">
                  Log in
                </Button>
              </Form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(LogIn);
