import React from "react";
import { connect } from "react-redux";

import { Link } from "react-router-dom";
import { Route } from "react-router-dom";

import User from "./components/User/User";
import Repos from "./components/Repos/Repos";
import Following from "./components/Following/Following";

import * as actions from "./actions/actions";

import logo from "./assets/icons/accountcircle.svg";
import search from "./assets/icons/search.svg";
import "./App.css";
import Tabs from "./components/Tabs/Tabs";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidUpdate() {
    console.log("this.props => ", this.props);
  }

  handleChange(event) {
    console.log("handlechange");
    // this.setState({userName: event.target.value});
    this.props.updateUserName(event.target.value);
  }

  handleTabChange(tab) {
    console.log("tab changed => ", tab);
  }

  render() {
    console.log("histpry => ", this.props);
    return (
      <div className="App">
        <div className="App-Content">
          <img src={logo} className="App-Logo" alt="logo" />
          <p>Enter User Name to Search</p>
          <form className="Search-Form">
            <input
              type="text"
              placeholder="Search.."
              name="Search-Text"
              value={this.props.userName}
              onChange={this.handleChange}
            />
            <button type="submit">
              <Link to={`/user/details/${this.props.userName}`}>
                <img src={search} alt="search" className="Search-Icon" />
              </Link>
            </button>
          </form>
        </div>

        <Tabs onClick={this.handleTabChange}>
          <div label="Profile" routerLink={`/user/details/${this.props.userName}`}>
            <Route path="/user/details/:id" component={User} />
          </div>
          <div label="Repos" routerLink={`/user/repos/${this.props.userName}`} >
            <Route path="/user/repos/:id" component={Repos} />
          </div>
          <div label="Following" routerLink={`/user/following/${this.props.userName}`}>
            <Route path="/user/following/:id" component={Following} />
          </div>
        </Tabs>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  userName: state.userName,
  user: state.user
});

const mapDispatchToProps = dispatch => ({
  updateUserName: userName => dispatch(actions.updateUserName(userName))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
