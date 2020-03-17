import React from "react";
import { connect } from 'react-redux';
import "./User.css";
import { isEmpty } from "lodash";

class User extends React.Component {

  render() {
    const user = this.props.user;
    console.log('this.props ===> ', this.props);

    return (
      <div className="User">
        {!isEmpty(this.props.user.details) && (
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
        {isEmpty(this.props.user.details) && (
          <div>User Not Found</div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
})

export default connect(mapStateToProps)(User)
