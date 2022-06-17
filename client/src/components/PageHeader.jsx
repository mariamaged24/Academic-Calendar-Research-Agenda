import React, { Component } from "react";
import LogoName from "./LogoName";
import { withRouter } from "react-router";
import {
  Nav,
  Form,
  Button,
  Navbar,
  Container,
  NavDropdown,
  FormControl,
} from "react-bootstrap";
import {
  BsHouseDoorFill,
  BsQuestionDiamondFill,
  BsCalendar3WeekFill,
  BsSearch,
} from "react-icons/bs";
import { Link } from "react-router-dom";
class PageHeader extends Component {
  state = {
    first: localStorage.getItem("first"),
    last: localStorage.getItem("last"),
    search: "",
  };
  handleSearch(e) {
    this.setState({ [e.target.name]: e.target.value });
    localStorage.setItem('search', this.state.search)
  }
  handleSearchClick(){
    if (this.props.location.pathname === "/searchresults") {
      this.props.parentFunction()
    }
    else{
      this.props.history.push("/searchresults");
    }

  }

  handleLogout(){
    localStorage.removeItem("id")
    localStorage.removeItem("first")
    localStorage.removeItem("last")
    this.props.history.push('/')
  }

  render() {
    return (
      <div>
        <div className="Header">
          <Link style={{ textDecoration: "none" }} to="/homepage">
            <LogoName />
          </Link>
          <div className="NormalHeader">
            <Navbar
              style={{ padding: "2em" }}
              background-color="rgba(0,0,0,0.0)"
              expand="lg"
            >
              <Container>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="me-auto">
                    <Link style={{ textDecoration: "none" }} to="/homepage">
                      <Nav.Link
                        style={{
                          height: "2.3em",
                          width: "5em",
                          fontSize: "1em",
                          color: "white",
                        }}
                        href="/homepage"
                      >
                        <BsHouseDoorFill />
                        Home
                      </Nav.Link>{" "}
                    </Link>
                    <Link style={{ textDecoration: "none" }} to="/questions">
                      <Nav.Link
                        style={{
                          height: "2.3em",
                          width: "7em",
                          fontSize: "1em",
                          color: "white",
                        }}
                        href="/questions"
                      >
                        <BsQuestionDiamondFill /> Questions
                      </Nav.Link>
                    </Link>
                    <Link style={{ textDecoration: "none" }} to="/scheduler">
                      <Nav.Link
                        style={{
                          height: "2.3em",
                          width: "7em",
                          fontSize: "1em",
                          color: "white",
                        }}
                        href="/scheduler"
                      >
                        <BsCalendar3WeekFill /> Calendar
                      </Nav.Link>
                    </Link>
                  </Nav>
                  <Form className="d-flex">
                    <FormControl
                      style={{
                        height: "2.3em",
                        width: "23em",
                        fontSize: "1em",
                      }}
                      type="search"
                      name="search"
                      value={this.state.search}
                      onChange={(e) => this.handleSearch(e)}
                      placeholder="Search for research, questions and researchers"
                      variant="outline-light"
                      className="me-2"
                      aria-label="Search"
                    />
                      <Button
                        style={{
                          height: "2.3em",
                          width: "10em",
                          fontSize: "1em",
                        }}
                        onClick={()=>this.handleSearchClick()}
                        variant="outline-light"
                      >
                        {" "}
                        <BsSearch /> Search
                      </Button>
                    
                  </Form>
                  <NavDropdown
                    title={this.state.first + " " + this.state.last}
                    id="dropdown-button-light-example1"
                  >
                    <Link style={{ textDecoration: "none" }} to="/editprofile">
                      <NavDropdown.Item href="/changepassword">
                        Edit My Profile
                      </NavDropdown.Item>
                    </Link>
                    <Link style={{ textDecoration: "none" }} to="/profile/">
                      <NavDropdown.Item href="/profile">
                        View My Profile
                      </NavDropdown.Item>
                    </Link>
                    <NavDropdown.Divider />
                    <Link style={{ textDecoration: "none" }} to="/">
                      <NavDropdown.Item href="/">Log Out</NavDropdown.Item>
                    </Link>
                  </NavDropdown>
                </Navbar.Collapse>
              </Container>
            </Navbar>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(PageHeader);
//title= {<span className="NormalText">First Last</span>}>
