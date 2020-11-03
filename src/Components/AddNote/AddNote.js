import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Context from "../Context/Context";
import PropTypes from "prop-types";
import { API_ENDPOINT } from "../../config";

class AddNote extends Component {
  static contextType = Context;

  handleSubmit = (e) => {
    e.preventDefault();
    console.log("submit button at add note component");
    const name = e.target.note.value;
    const content = e.target.content.value;
    const folderId = e.target.folderId.value;

    const data = {
      notes_name: name,
      notes_content: content,
      folder_id: folderId,
    };

    fetch(`${API_ENDPOINT}/notes/`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        this.context.addNote(data);
        this.props.history.push("/");
      })
      .catch((e) => {
        console.log(e.message);
      });
  };

  getFolder = () => {
    const { folders } = this.context;

    return folders.map((folder, i) => {
      return (
        <option key={i} value={folder.id}>
          {folder.folder_name}
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
