import React from "react";
import { connect } from 'react-redux';
import "./User.css";

import * as actions from "../../actions/actions";

class User extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    console.log('component mounted');
    const { params } = this.props.match;
    console.log("user params 11", params);
    fetch(`http://localhost:8080/user/details/${params.id}`)
      .then(response => response.json())
      .then(data => {
        console.log("data ~~~~ => ", data);
        this.props.updateUserDetails(data);
      });
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  render() {

    const user = this.props.user;

    return (
      <div className="User">
        {this.props.user.details && (
          <div className="User-Profile">
            <div className="User-Image">
              <img
                className="User-Avatar"
                src={user.details.avatar_url}
                alt={`${user.details.login} avatar`}
              />
            </div>
            <div className="User-Details">
              <div className="User-Data">
                <div className="Data-Name">Profile Name</div>
                <div className="Separator"> : </div>
                <div className="Data-Value">{user.details.name}</div>
              </div>
              <div className="User-Data">
                <div className="Data-Name">User Name</div>
                <div className="Separator"> : </div>
                <div className="Data-Value">{user.details.login}</div>
              </div>
              <div className="User-Data">
                <div className="Data-Name">Company Name</div>
                <div className="Separator"> : </div>
                <div className="Data-Value">{user.details.company}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
})

const mapDispatchToProps = dispatch => ({
  updateUserDetails: details => dispatch(actions.updateUserDetails(details))
})

export default connect(mapStateToProps, mapDispatchToProps)(User)
