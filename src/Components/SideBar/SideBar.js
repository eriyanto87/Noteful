import React, { Component } from "react";
import { NavLink, withRouter } from "react-router-dom";

 class SideBar extends Component {
  render() {

    const template = this.props.folders ? (
      <div className="sidebar">
        <ul>Folders</ul>
        {this.props.folders.map((folder) => (
          <NavLink key={folder.id} to={{ pathname: `/folder/${folder.id}` }}>
            <li>{folder.name}</li>
          </NavLink>
        ))}
      </div>
    ) : (
      <>
      <h2>Folder: {this.props.folderName[0].name}</h2>
          <button
            type="button"
            onClick={() => {
              this.props.history.goBack();
            }}
          >Back
          </button>
      </>
    );

    return ( 
      <>
        {template}
        </>
    );
  }
}

export default withRouter(SideBar)