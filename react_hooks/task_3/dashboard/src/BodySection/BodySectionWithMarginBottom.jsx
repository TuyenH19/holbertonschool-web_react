import React, {Component} from "react";
import BodySection from "./BodySection";

class BodySectionWithMarginBottom extends Component {
  render() {
    const { title, children } = this.props;
    return (  
      <div className="bodySectionWithMargin mb-10 px-5">
        <h2 className="text-xl font-bold mb-2.5">{title}</h2>
        {children}
      </div>
    );
  }
}

export default BodySectionWithMarginBottom;
