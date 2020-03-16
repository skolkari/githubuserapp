import React from "react";
import { connect } from "react-redux";
import * as actions from "../../actions/actions";
import "./Repos.css";

class Repos extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const { params } = this.props.match;
    console.log("user params 11", params);
    fetch(`http://localhost:8080/user/repos/${params.id}`)
      .then(response => response.json())
      .then(data => {
        if (data && data.length > 0) {
          console.log("data ~~~~ => ", data[0]);
          this.props.updateUserRepos(data[0]);
        }
      });
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  render() {
    const { params } = this.props.match;
    console.log("user params", params);
    console.log("this.props => ", this.props);

    const user = this.props.user;

    return (
      <div className="Repos">
        {this.props.user.repos && (
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
                User {this.props.user.details.name} ({this.props.user.details.login}) with {this.props.user.details.followers} is following {this.props.user.details.following}.
                <br></br>
                One repo for this user is {this.props.user.repos.full_name} and it is {this.props.user.repos.full_name ? 'private': 'not private'}
              </div>
            }
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
