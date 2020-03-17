import React from "react";
import { connect } from "react-redux";
import "./Following.css";
import * as actions from "../../actions/actions";
import loader from "../../assets/icons/loading.gif";

class Following extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataFetched: false,
      followingMembersFound: true
    };
  }

  componentDidMount() {
    console.log('component mounted => ', this.props.count);
    
    this.setState({
      dataFetched: false
    });
    const { params } = this.props.match;
    console.log("user params 11", params);
    fetch(`http://localhost:8080/user/following/${params.id}/${this.props.count}`)
      .then(response => response.json())
      .then(data => {
        if (data && data.length > 0) {
          this.setState({
            dataFetched: true,
            followingMembersFound: true
          });
          console.log("data ~~~~ => ", data);
          this.props.updateUserFollowing(data);
          this.props.updateFollowingCount(this.props.count + 10);
        } else {
          this.setState({
            dataFetched: true,
            followingMembersFound: false
          });
        }
      });
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
    console.log("this.props following => ", this.props);

    return (
      <div className="Following">
        {!this.state.dataFetched && (
          <div className="Loading">
            <img src={loader} alt="loading" />
          </div>
        )}
        {this.state.dataFetched &&
          this.state.followingMembersFound &&
          this.props.user.following.map((followingUser, i) =>
            this.renderFollowingUser(followingUser, i)
          )}
        {this.state.dataFetched && !this.state.followingMembersFound && (
          <div className="Following-Nousers">User Following 0 members</div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  count: state.followingCount
});

const mapDispatchToProps = dispatch => ({
  updateUserFollowing: followingData => dispatch(actions.updateUserFollowing(followingData)),
  updateFollowingCount: count => dispatch(actions.updateFollowingCount(count))
});

export default connect(mapStateToProps, mapDispatchToProps)(Following);
