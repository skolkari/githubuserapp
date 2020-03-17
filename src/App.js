import React from "react";
import { connect } from "react-redux";

import { Route } from "react-router-dom";

import User from "./components/User/User";
import Repos from "./components/Repos/Repos";
import Following from "./components/Following/Following";

import * as actions from "./actions/actions";

import logo from "./assets/icons/accountcirclewhite.svg";
import search from "./assets/icons/search.svg";
import loader from "./assets/icons/loading.gif";
import "./App.css";
import Tabs from "./components/Tabs/Tabs";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      dataFetched: true,
      userFound: true,
      error: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTabChange = this.handleTabChange.bind(this);
  }

  componentDidMount() {
    console.log("this.props => ", this.props);
    if(this.props.match.isExact === false && this.props.userName === '') {
      this.props.history.push('/');
    } 
  }

  handleTabChange(tab) {
    console.log("tab changed => ", tab);
    this.props.updateActiveTab(tab);
  }

  handleSubmit(e) {
    this.setState({
      dataFetched: false
    });
    e.preventDefault();
    console.log('submit event => ', this.state.userName);
    fetch(`http://localhost:8080/user/details/${this.state.userName}`)
      .then(response => response.json())
      .then(data => {
        console.log('data ==> ', data);
        if(data) {
          if(data.message === 'Not Found') {
            this.setState({
              dataFetched: true,
              userFound: false
            });
          } else {
            this.setState({
              dataFetched: true,
              userFound: true
            });
            this.props.updateUserDetails(data);
          }
        }
      }).catch(error => {
        this.setState({
          dataFetched: true,
          error: true
        });
      });
    this.props.history.push(`/user/details/${this.state.userName}`);
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({
      userName: e.target.value
    });
    console.log('change event => ', this.state.userName);
  }

  render() {
    console.log("histpry => ", this.props);
    console.log("state => ", this.state);
    return (
      <div className="App">
        {!this.state.dataFetched && (<div className="Loading">
          <img src={loader} alt="loading" />
        </div>)}
        <div className="App-Content">
          <img src={logo} className="App-Logo" alt="logo" />
          <p>Enter User Name to Search</p>
          <form className="Search-Form" onSubmit={this.handleSubmit} >
            <input
              ref="searchInput"
              type="text"
              placeholder="Search.."
              name="Search-Text"
              value={this.state.userName}
              onChange={this.handleChange}
            />
            <button type="submit">
                <img src={search} alt="search" className="Search-Icon" />
            </button>
          </form>
        </div>
        {
          this.state.dataFetched && !this.state.error && this.props.userName && this.state.userFound && (
            <Tabs activeTab={this.props.activeTab} onClick={this.handleTabChange}>
              <div label="Profile" routerLink={`/user/details/${this.props.userName}`}>
                <Route path="/user/details/:id" component={User} />
              </div>
              <div label="Repos" routerLink={`/user/repos/${this.props.userName}`} >
                <Route path="/user/repos/:id" component={Repos} />
              </div>
              <div label="Following" routerLink={`/user/following/${this.props.userName}`}>
                <Route exact path="/user/following/:id" component={Following} />
              </div>
            </Tabs>
          )
        }
        {
          this.state.dataFetched && !this.state.error && !this.state.userFound && (
            <div>User Not Found</div>
          )
        }
        {
          this.state.dataFetched && this.state.error && (
            <div>Error occurred while fetching data. Please try again.</div>
          )
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  userName: state.userName,
  user: state.user,
  activeTab: state.activeTab
});

const mapDispatchToProps = dispatch => ({
  updateUserName: userName => dispatch(actions.updateUserName(userName)),
  updateUserDetails: details => dispatch(actions.updateUserDetails(details)),
  updateActiveTab: tabName => dispatch(actions.updateActiveIndex(tabName))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
