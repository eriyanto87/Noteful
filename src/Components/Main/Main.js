import React, { Component } from "react";
import {Link} from 'react-router-dom';

export default class Main extends Component {
  render() {
    console.log('this is the main.js file')
    return (
      <div>
        {this.props.notes.map((note) => (
          <div key={note.id}>
            <Link key={note.id} to={{ pathname: `/note/${note.id}` }}>
              <h3>Name: {note.name}</h3>
            </Link>
            <p>Date modified: {note.modified}</p>
          </div>
        ))}
      </div>
    );
  }
}
