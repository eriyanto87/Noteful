import React, { Component } from "react";
import SideBar from "../SideBar/SideBar";
import Main from "../Main/Main";

export default class Folder extends Component {
 

  render() {  

    const { match, notes, folders } = this.props;
    const idMatch = match.params.folderId;
    //console.log('this is the params of match', idMatch)
   // console.log('these are the notes', notes)
    return (
      <div>
        <SideBar folders={folders} />
        <Main notes={notes.filter(note => note.folderId === idMatch)} />
      </div>
    );
  }
}
