import React from "react";
import "./Tab.css";
import { Link } from "react-router-dom";

class Tab extends React.Component {
  onClick = () => {
    const { label, onClick } = this.props;
    onClick(label);
  };

  render() {
    const {
      onClick,
      props: { activeTab, label }
    } = this;

    let className = "tab-list-item";

    if (activeTab === label) {
      className += " tab-list-active";
    }

    return (
      <li className={className} onClick={onClick}>
        {
          this.props.routerLink && (
            <Link to={this.props.routerLink} > {label} </Link>
          )
        }

        {
          !this.props.routerLink && (
            <span>{label}</span>
          )
        }
      </li>
    );
  }
}

export default Tab;
