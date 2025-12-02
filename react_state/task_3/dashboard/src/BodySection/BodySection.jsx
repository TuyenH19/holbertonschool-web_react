import React, {Component} from "react";

class BodySection extends Component {
  render() {
    const { title, children } = this.props;
    return (
      <div className="px-5 pb-2.5 mb-5 border-b-[3px] border-[var(--main-color)] pt-60">
        <h2 className="text-xl font-bold mb-2.5">{title}</h2>
        {children}
      </div>
    );
  }
}

export default BodySection;
