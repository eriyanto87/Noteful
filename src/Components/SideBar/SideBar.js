import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import Context from "../Context/Context";
import PropTypes from "prop-types";

class SideBar extends Component {
  static contextType = Context;
  render() {
    const template = this.props.folders ? (
      <div>
        <ul className="folder-list-ul"></ul>
        {this.context.folders.map((folder) => (
          <Link key={folder.id} to={{ pathname: `/folders/${folder.id}` }}>
            <li className="folder-list">{folder.folder_name}</li>
          </Link>
        ))}
      </div>
    ) : (
      <>
        <h3>{this.props.targetFolder[0].folder_name}</h3>
        <button
          type="button"
          onClick={() => {
            this.props.history.goBack();
          }}
        >
          Back
        </button>
      </>
    );
    return (
      <div>
        <div className="sidebar">
          <h3 className="folder-title">
            Folders
            <p>
              <Link to={{ pathname: "/add-folder" }}>
                <button>Add Folder</button>
              </Link>
            </p>
          </h3>
          {template}
        </div>
      </div>
    );
  }
}

SideBar.propTypes = {
  folders: PropTypes.array.isRequired,
  history: PropTypes.object.isRequired,
};

export default withRouter(SideBar);
