import React, { Component } from "react";
import { Card } from "react-bootstrap";
import { withRouter } from "react-router";
import UserHeader from "../components/UserHeader";
import { Link } from "react-router-dom";
import apis from "../api"

class UserFollowers extends Component {
  state = {
    following:[],
    followerss: [],
  };
  async componentDidMount() {
    this.handleReload()
  }

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

  async handleReload(){
    if (!localStorage.getItem("token")) {
      this.props.history.push("/");
    }
    await apis
      .getFollowers(localStorage.getItem("id"))
      .then((res) => {
        this.setState({ following: res.data.data.Following });
      })
      .catch((err) => {
      });

      await apis
      .getFollowers(this.props.match.params.id)
      .then((res) => {
        this.setState({ followerss: res.data.data.Followers });
      })
      .catch((err) => {
      });
  }


  render() {
    return (
      <div>
        <UserHeader userid = {this.props.match.params.id} />
        <div className="container">
          {this.state.followerss.map((follower) => (
            <div className="DynamicInputs">
              <Card
                style={{
                  width: "360px",
                  height: "90px",
                  marginBottom: "1em",
                }}
              >
                <Card.Body style={{ marginTop: "-0.3em" }}>
                  <Card.Title style={{ fontSize: "18px" }}>
                    <Link style={{ textDecoration: "none", color:'black' }} to={'/user/'+follower._id }>
                    {follower.FirstName + " " + follower.LastName}
                    </Link >
                  </Card.Title>
                  <Card.Subtitle
                    className="mb-2 text-muted"
                    style={{ fontSize: "14px" }}
                  >
                    {follower.FieldOfStudy + " | " + follower.University}
                  </Card.Subtitle>
                </Card.Body>
              </Card>
           {follower._id!==localStorage.getItem('id') && <button
                onClick={() => this.handleButton(this.checkFollow(follower._id), follower._id)}
                style={{
                  marginLeft: "0.5em",
                  width: "20vh",
                  height: "5vh",
                  marginTop: "0.7em",
                }}
                className="ButtonBasicColor"
              >
               {this.checkFollow(follower._id)? "Unfollow":"Follow"}
              </button>}
              {follower._id===localStorage.getItem('id') && 
              <Link to="/profile">
              <button
                onClick={() => this.handleButton(this.checkFollow(follower._id), follower._id)}
                style={{
                  marginLeft: "0.5em",
                  width: "20vh",
                  height: "5vh",
                  marginTop: "0.7em",
                }}
                className="ButtonBasicColor"
              >
               My profile
              </button></Link>}
              
            </div>
          ))}
        </div>
      </div>
    );
  }
  
}

export default withRouter(UserFollowers);
