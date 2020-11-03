import React from "react";

const Context = React.createContext({
  folders: [],
  notes: [],
  updateStore: () => {},
  addNote: () => {},
  addFolder: () => {},
  deleteNote: () => {},
});

export default Context;
