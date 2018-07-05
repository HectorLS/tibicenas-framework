import React from "react";
import { ICONS } from "../constants/ICONS";

class Icon extends React.Component {
  render() {
    return (
      <svg width="22" height="22" viewBox="0 0 1024 1024">
        <path d={ICONS[this.props.type]} fill={this.props.color} />
      </svg>
    );
  }
}

export default Icon;
