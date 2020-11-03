import React, { Component } from "react";
import Context from "../Context/Context";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { API_ENDPOINT } from "../../config";

class AddForm extends Component {
  static contextType = Context;

  handleSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value;

    fetch(`${API_ENDPOINT}/folders/`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ folder_name: name }),
    })
      .then((res) => res.json())
      .then((data) => {
        this.context.addFolder(data);
        this.props.history.push("/");
      })
      .catch((e) => {
        console.log(e.message);
      });
  };

  render() {
    return (
      <div className="add-folder">
        <h3>Add Folder</h3>
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <p>Name</p>
          <input
            type="text"
            id="name"
            placeholder="Name of folder"
            required
          ></input>
          <p>
            <button type="submit">Submit</button>
            <button onClick={this.props.history.goBack} type="cancel">
              Cancel
            </button>
          </p>
        </form>
      </div>
    );
  }
}

AddForm.propTypes = {
  history: PropTypes.object.isRequired,
};

export default withRouter(AddForm);
