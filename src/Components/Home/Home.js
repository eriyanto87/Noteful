import React, { Component } from "react";

export default class MainView extends Component {
  render() {
    return <div>{this.props.children}</div>;
  }
}
