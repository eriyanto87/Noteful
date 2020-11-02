import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./Components/Home/Home";
import Note from "./Components/Note/Note";
import Folder from "./Components/Folder/Folder";
import Header from "./Components/Header/Header";
import NotFound from "./Components/NotFound/NotFound";
import SideBar from "./Components/SideBar/SideBar";
import Main from "./Components/Main/Main";
import Context from "./Components/Context/Context";
import "./App.css";
import AddFolder from "./Components/AddFolder/AddFolder";
import AddNote from "./Components/AddNote/AddNote";

class App extends Component {
  state = {
    folders: [],
    notes: [],
    url: "http://localhost:8000/api",
  };

  getFolders = () => {
    fetch(`${this.state.url}/folders`)
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          folders: data,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  getNotes = () => {
    fetch(`${this.state.url}/notes`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        this.setState({
          notes: data,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  deleteNote = (id) => {
    fetch(`${this.state.url}/notes/${id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((data) => {
        const notes = this.state.notes.filter((note) => note.id !== id);
        this.setState({
          notes: notes,
        });
      })
      .catch((e) => {
        throw new Error("note deletion failed!");
      });
  };

  componentDidMount() {
    this.getNotes();
    this.getFolders();
  }

  render() {
    return (
      <Context.Provider
        value={{
          notes: this.state.notes,
          folders: this.state.folders,
          deleteNote: this.deleteNote,
        }}
      >
        <div className="App">
          <BrowserRouter>
            <Header />
            <Switch>
              <Route exact path="/">
                <Home>
                  <SideBar folders={this.state.folders} />
                  <Main notes={this.state.notes} />
                </Home>
              </Route>
              <Route path="/notes/:notesId" component={Note}></Route>
              <Route path="/folders/:folderId" component={Folder}></Route>
              <Route path="/add-folder" component={AddFolder}></Route>
              <Route path="/add-note">
                <AddNote folders={this.state.folders} />
              </Route>
              <Route>
                <NotFound />
              </Route>
            </Switch>
          </BrowserRouter>
        </div>
      </Context.Provider>
    );
  }
}

export default App;
