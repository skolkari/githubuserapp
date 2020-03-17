import React from "react";
import { connect } from "react-redux";
import * as actions from "../../actions/actions";
import "./Repos.css";
import loader from "../../assets/icons/loading.gif";

class Repos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataFetched: false,
      reposFound: true
    }
  }

  componentDidMount() {
    this.setState({
      dataFetched: false
    });
    const { params } = this.props.match;
    console.log("user params 11", params);
    fetch(`http://localhost:8080/user/repos/${params.id}`)
      .then(response => response.json())
      .then(data => {
        if (data && data.length > 0) {
          this.setState({
            dataFetched: true,
            reposFound: true
          });
          console.log("data ~~~~ => ", data[0]);
          this.props.updateUserRepos(data[0]);
        } else {
          this.setState({
            dataFetched: true,
            reposFound: false
          });
        }
      });
  }

  componentDidUpdate() {
    console.log('repos updated');
  }

  render() {
    const { params } = this.props.match;
    console.log("user params", params);
    console.log("this.props => ", this.props);

    const user = this.props.user;

    return (
      <div className="Repos">
        {!this.state.dataFetched && (<div className="Loading">
          <img src={loader} alt="loading" />
        </div>)}
        {this.state.dataFetched && this.state.reposFound && (
          <div className="Repos-Profile">
            <div className="Repos-Image">
              <img
                className="Repos-Avatar"
                src={user.details.avatar_url}
                alt={`${user.details.login} avatar`}
              />
            </div>
            {
              <div className="Repos-Details">
                User <span className="Highlight">{this.props.user.details.name} ({this.props.user.details.login}) </span> 
                with <span className="Highlight">{this.props.user.details.followers}</span> followers is 
                following <span className="Highlight">{this.props.user.details.following}</span>.
                <br></br>
                One repo for this user is <span className="Highlight">{this.props.user.repos.full_name}</span> 
                and it is <span className="Highlight">{this.props.user.repos.full_name ? 'private': 'not private'}</span>
              </div>
            }
          </div>
        )}
        {this.state.dataFetched && !this.state.reposFound && (
          <div className="Repos-Norepos">
            No Repos Available for this User
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});

const mapDispatchToProps = dispatch => ({
  updateUserRepos: repos => dispatch(actions.updateUserRepos(repos))
});

export default connect(mapStateToProps, mapDispatchToProps)(Repos);
