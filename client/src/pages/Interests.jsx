import React, { Component } from "react";
import { withRouter } from "react-router";
import SignUpHeader from "../components/SignUpHeader";
import { InputGroup, FormControl, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

class Interests extends Component {
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
          Remove Interest
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
  }

  removeClick(i) {
    let values = [...this.state.values];
    values.splice(i, 1);
    this.setState({ values });
  }

  handleSubmit(event) {
   localStorage.setItem('interests', JSON.stringify(this.state.values))
    event.preventDefault();
    this.props.history.push('/skills')
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
              <p className="Titles">Please enter your interests:</p>
              <div className="SignUpFlex">
                <div style={{ display: "inline-block" }}>
                  <form onSubmit={this.handleSubmit}>
                    {this.createUI()}
                    <Link to="/skills">
                    <Button onClick={this.handleSubmit.bind(this)} style={{marginTop: "1em", marginRight: "10px", marginLeft: "4em" }}>
                      Next
                    </Button>
                    </Link>
                    <Button style={{marginTop: "1em"}}
                      className="NormalText"
                      variant="secondary"
                      onClick={this.addClick.bind(this)}
                    >
                      Add Interest
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

export default withRouter(Interests);
