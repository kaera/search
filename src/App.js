import React from "react";
import "./App.css";
import Search from "./components/Search/Search";

export default function App() {
  return (
    <div className="App" data-testid="App">
      <Search
        autofocus
        onSubmit={(query) => console.log("Submitted:", query)}
      />
    </div>
  );
}
