import React, {Component} from "react";
import BodySection from "./BodySection";

class BodySectionWithMarginBottom extends Component {
  render() {
    const { title, children } = this.props;
    return (  
      <div className="bodySectionWithMargin">
        <h2 className="text-xl font-bold">{title}</h2>
        {children}
      </div>
    );
  }
}

export default BodySectionWithMarginBottom;
