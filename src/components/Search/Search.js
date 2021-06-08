import React, { useEffect, useRef, useState } from "react";
import Suggest from "../Suggest/Suggest";
import "./Search.css";

export default function Search(props) {
  const [userInput, setUserInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const searchInput = useRef(null);

  useEffect(() => {
    if (userInput) {
      (async () => {
        const json = await (await fetch("http://localhost:3000/search")).json();
        // In real-life application, we'd pass user input as a search query
        const suggestions = json.suggestions.filter((suggestion) =>
          suggestion.searchterm.toLowerCase().includes(userInput.toLowerCase())
        );
        setSuggestions(suggestions);
      })();
    } else {
      setSuggestions([]);
    }
  }, [userInput]);
  const handleChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleClearInput = (e) => {
    e.preventDefault();
    setUserInput("");
    searchInput.current.focus();
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSuggestions([]);
    props.onSubmit(userInput);
  };

  return (
    <div className="search" data-testid="Search">
      <form className="search-box" onSubmit={handleSearch}>
        <input
          value={userInput}
          name="search"
          className="input-search"
          placeholder="Zoeken"
          onChange={handleChange}
          autoComplete="off"
          autoFocus={props.autofocus}
          ref={searchInput}
        ></input>
        {userInput ? (
          <button
            className="clear-button"
            type="reset"
            onClick={handleClearInput}
          ></button>
        ) : (
          <></>
        )}
        <button className="search-button" type="submit"></button>
      </form>
      {userInput && searchInput.current === document.activeElement ? (
        <Suggest
          suggestions={suggestions}
          userInput={userInput}
          onSelect={(query) => {
            setUserInput(query);
            props.onSubmit(query);
          }}
        />
      ) : (
        <></>
      )}
    </div>
  );
}
