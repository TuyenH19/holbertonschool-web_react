import React, {Component} from "react";
import BodySection from "./BodySection";
//import './BodySectionWithMarginBottom.css';

class BodySectionWithMarginBottom extends Component {
  render() {
    return (  
      <div className="mb-10">
        <BodySection {...this.props} />
      </div>
    );
  }
}

export default BodySectionWithMarginBottom;
