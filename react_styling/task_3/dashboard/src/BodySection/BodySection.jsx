import React, {Component} from "react";
//import './BodySection.css';

class BodySection extends Component {
  render() {
    const { title, children } = this.props;
    return (
      <div className="px-5">
        <h2 className="text-xl font-bold">{title}</h2>
        {children}
      </div>
    );
  }
}

export default BodySection;
