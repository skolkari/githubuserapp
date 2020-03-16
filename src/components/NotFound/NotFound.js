import React from "react";
import logo from "../../assets/icons/accountcircle.svg";
import search from "../../assets/icons/search.svg";
import "./NotFound.css";

class NotFound extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  render() {
    return (
      <div className="NotFound">
        <div className="NotFound-Content">
          <img src={logo} className="App-Logo" alt="logo" />
          <p>Not Found</p>
          <form className="Search-Form" onSubmit={this.handleSubmit}>
            <button type="submit">
              <img src={search} alt="search" className="Search-Icon" />
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default NotFound;
