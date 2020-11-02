import React, { Component } from "react";
import SideBar from "../SideBar/SideBar";
import Main from "../Main/Main";
import Context from "../Context/Context";
import PropTypes from "prop-types";
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";

export default class Folder extends Component {
  static contextType = Context;

  render() {
    const { folders, notes } = this.context;
    const { match } = this.props;
    const folderId = match.params.folderId;
    console.log(folderId);

    return (
      <div>
        <ErrorBoundary message="SideBar Failed To Load">
          <SideBar folders={folders} />
        </ErrorBoundary>
        <ErrorBoundary message="Main Faied To Load">
          <Main
            notes={notes.filter((note) => {
              return folderId.includes(note.folder_id);
            })}
          />
        </ErrorBoundary>
      </div>
    );
  }
}

Folder.propTypes = {
  match: PropTypes.object.isRequired,
};
