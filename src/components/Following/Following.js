import React from "react";
import { connect } from "react-redux";
import "./Following.css";
import * as actions from "../../actions/actions";

class Following extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const { params } = this.props.match;
    console.log("user params 11", params);
    fetch(`http://localhost:8080/user/following/${params.id}`)
      .then(response => response.json())
      .then(data => {
        console.log("data ~~~~ => ", data);
        this.props.updateUserFollowing(data);
      });
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  renderFollowingUser(followingUser, i) {
    return (
      <div key={i} className="Following-Profile">
        <div className="Following-Image">
          <img
            className="Following-Avatar"
            src={followingUser.avatar_url}
            alt={`${followingUser.login} avatar`}
          />
        </div>
        <div className="Following-Details">
          <div className="Following-Data">
            <div className="Data-Name">User Name</div>
            <div className="Separator"> : </div>
            <div className="Data-Value">{followingUser.login}</div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    const { params } = this.props.match;
    console.log("user params", params);
    console.log("this.props => ", this.props);

    return (
      <div className="Following">
        {this.props.user.following &&
          this.props.user.following.map((followingUser, i) => this.renderFollowingUser(followingUser, i))}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});

const mapDispatchToProps = dispatch => ({
  updateUserFollowing: followingData =>
    dispatch(actions.updateUserFollowing(followingData))
});

export default connect(mapStateToProps, mapDispatchToProps)(Following);
