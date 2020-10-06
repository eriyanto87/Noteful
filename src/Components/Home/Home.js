import React, { Component } from "react";

// import {Route} from 'react-router-dom';

export default class MainView extends Component {
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}
