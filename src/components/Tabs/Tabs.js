import React from "react";
import Tab from "./Tab";
import "./Tabs.css";

class Tabs extends React.Component {

  onClickTabItem = tab => {
    this.props.onClick(tab);
  };

  render() {
    const {
      onClickTabItem,
      props: { children, activeTab }
    } = this;

    console.log('activeTab => ', activeTab);

    return (
      <div className="tabs">
        <ol className="tab-list">
          {children.map(child => {
            const { label, routerLink } = child.props;

            return (
              <Tab
                activeTab={activeTab}
                key={label}
                label={label}
                routerLink={routerLink}
                onClick={onClickTabItem}
              />
            );
          })}
        </ol>
        <div className="tab-content">
          {children.map((child, i) => {
            if (child.props.label !== activeTab) return undefined;
            return <div key={i} >{child.props.children}</div>;
          })}
        </div>
      </div>
    );
  }
}

export default Tabs;
