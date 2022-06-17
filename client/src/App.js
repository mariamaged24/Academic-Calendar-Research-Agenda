import './style/App.css';

import { Route, Switch } from 'react-router-dom'
import "@progress/kendo-theme-default/dist/all.css";
import LogIn from './pages/LogIn';
import SignUp from './pages/SignUp';
import Interests from './pages/Interests';
import Skills from './pages/Skills';
import HomePage from './pages/HomePage';
import Schedulerr from './pages/Schedulerr';
import Questions from './pages/Questions';
import ProfilePage from './pages/ProfilePage';
import UserPage from './pages/UserPage';
import MyQuestions from './pages/MyQuestions';
import Followers from './pages/Followers';
import Following from './pages/Following';
import EditProfile from './pages/EditProfile'
import SearchResults from './pages/SearchResults'
import UserQuestions from './pages/UserQuestions'
import UserFollowing from './pages/UserFollowing'
import UserFollowers from './pages/UserFollowers'

function App() {
  return (
    
    <Switch>
    <Route exact path="/"><LogIn/> </Route>
    <Route exact path="/signup"><SignUp/></Route>
    <Route exact path="/interests"><Interests/></Route>
    <Route exact path="/skills"><Skills/></Route>
    <Route exact path="/homepage"><HomePage/></Route>
    <Route exact path="/user/:id"><UserPage/></Route>
    <Route className="k-my-8"  exact path="/scheduler"><Schedulerr/></Route>
    <Route exact path="/questions"><Questions/></Route>
    <Route exact path="/profile"><ProfilePage/></Route>
    <Route exact path="/myquestions"><MyQuestions/></Route>
    <Route exact path="/userquestions/:id"><UserQuestions/></Route>
    <Route exact path="/userfollowing/:id"><UserFollowing/></Route>
    <Route exact path="/userfollowers/:id"><UserFollowers/></Route>
    <Route exact path="/followers"><Followers/></Route>
    <Route exact path="/following"><Following/></Route>
    <Route exact path = "/editprofile"><EditProfile/></Route>
    <Route exact path = "/searchresults"><SearchResults/></Route>
   </Switch>
  
  ); 
}

export default App;
