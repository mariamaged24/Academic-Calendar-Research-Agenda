import React, { Component } from "react";
import { Card } from "react-bootstrap";
import { withRouter } from "react-router";
import ProfileHeader from "../components/ProfileHeader";
import { Link } from "react-router-dom";
import apis from "../api";
class Following extends Component {
  state = {
    followings: [],
  };
async componentDidMount (){
  this.handleReload()
}

async handleUnfollow(followingId){
   await apis.unfollowUser(localStorage.getItem('id'),{followingid:followingId})
   .then((res)=>{
    this.handleReload()
   }).catch((err)=>{
    
   })
}

async handleReload(){
  if (!localStorage.getItem("token")) {
    this.props.history.push("/");
  }
  await apis.getFollowing(localStorage.getItem('id')).then((res)=>{
    this.setState({followings:res.data.data.Following})
  }).catch((err)=>{
  })
}

  render() {
    return (
      <div>
        <ProfileHeader />
        <div className="container" >
          {this.state.followings.map(following=>
          <div className="DynamicInputs"><Card
                style={{
                  width: "360px",
                  height: "90px",
                  marginBottom:"1em"
                }}
              >
                <Card.Body style={{ marginTop: "-0.3em" }}>
                  <Card.Title style={{ fontSize: "18px" }}>
                  <Link style={{ textDecoration: "none", color:'black' }} to={'/user/'+following._id }>
                    {following.FirstName + " " + following.LastName}
                    </Link>
                  </Card.Title>
                  <Card.Subtitle
                    className="mb-2 text-muted"
                    style={{ fontSize: "14px" }}
                  >
                    {following.FieldOfStudy + " | " + following.University}
                  </Card.Subtitle>
                </Card.Body>
              </Card>
            
            <button onClick={()=>this.handleUnfollow(following._id)} style={{marginLeft:"0.5em",width:"20vh",height:"5vh", marginTop:"0.7em"}} className="ButtonBasicColor">
                Unfollow
              </button></div>)}
        </div>
      </div>
    );
  }
}

export default withRouter(Following);
