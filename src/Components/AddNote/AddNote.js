import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Context from "../Context/Context";
import PropTypes from "prop-types";

class AddNote extends Component {
  static contextType = Context;

  handleSubmit = (e) => {
    e.preventDefault();
    console.log("submit button at add note component");
    const name = e.target.note.value;
    const content = e.target.content.value;
    const folderId = e.target.folderId.value;

    const data = {
      name: name,
      content: content,
      modified: new Date(),
      folderId: folderId,
    };

    this.addFolder(data);
  };

  addFolder = (data) => {
    const { history } = this.props;
    fetch(`${this.context.url}/notes/`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((data) => {
        this.context.updateStore();
        history.push("/");
      })
      .catch((e) => {
        throw new Error("new note creation failed");
      });
  };

  getFolder = () => {
    const { folders } = this.props;

    return folders.map((folder, i) => {
      return (
        <option key={i} value={folder.id}>
          {folder.name}
        </option>
      );
    });
  };

  render() {
    return (
      <div className="add-note">
        <h3>AddNote</h3>
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <p>
            <label>Note Name </label>
            <input type="text" id="note" required />
          </p>
          <p>
            <label>Content </label>
            <input type="text" id="content" required />
          </p>
          <p>
            <label>Folder </label>
            <select id="folderId">{this.getFolder()}</select>
          </p>
          <button type="submit">Submit</button>
          <button onClick={this.props.history.goBack} type="cancel">
            Cancel
          </button>
        </form>
      </div>
    );
  }
}

AddNote.propTypes = {
  folders: PropTypes.array.isRequired,
  history: PropTypes.object.isRequired,
};

export default withRouter(AddNote);
