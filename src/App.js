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
import { API_ENDPOINT } from "./config";

class App extends Component {
  state = {
    folders: [],
    notes: [],
    addFolder: (folder) =>
      this.setState({ folders: [...this.state.folders, folder] }),
    addNote: (note) => this.setState({ notes: [...this.state.notes, note] }),
    deleteNote: (id) => {
      fetch(`${API_ENDPOINT}/notes/${id}`, {
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
    },
  };

  getFolders = () => {
    fetch(`${API_ENDPOINT}/folders`)
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
    fetch(`${API_ENDPOINT}/notes`)
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          notes: data,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  componentDidMount() {
    this.getNotes();
    this.getFolders();
  }

  render() {
    return (
      <Context.Provider value={this.state}>
        <div className="App">
          <BrowserRouter>
            <Header />
            <Switch>
              <Route exact path="/">
                <Home>
                  <SideBar />
                  <Main />
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
