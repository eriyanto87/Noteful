import React, { Component } from "react";
import SideBar from "../SideBar/SideBar";
import Context from "../Context/Context";
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";

export default class Note extends Component {
  static contextType = Context;

  render() {
    const { match } = this.props;
    const { notes, folders } = this.context;
    console.log(this.context);

    const notesId = match.params.notesId;
    console.log(notesId);

    const note = notes.filter((note) => note.id == notesId);
    console.log(note);

    if (note.length === 0) {
      return <p>Loading</p>;
    }

    const folderId = note[0].folder_id;
    console.log(folderId);
    const targetFolder = folders.filter((folder) => folder.id === folderId);
    console.log(targetFolder[0]);

    if (targetFolder.length === 0) {
      return <p>loading</p>;
    }
    return (
      <div>
        <ErrorBoundary message="SideBar Failed To Load">
          <SideBar targetFolder={targetFolder} />
          <h3>Name: {note[0].notes_name}</h3>
          <p>Date Modified: {note[0].date_modified} </p>
          <p>Content:</p>
          <p>{note[0].notes_content}</p>
        </ErrorBoundary>
      </div>
    );
  }
}
