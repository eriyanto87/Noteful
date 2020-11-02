import React from "react";

const Context = React.createContext({
  folders: [],
  notes: [],
  updateStore: () => {},
  url: "http://localhost:8000/api",
  addNote: () => {},
  addFolder: () => {},
  deleteNote: () => {},
});

export default Context;
