import React, { useRef, useState } from "react";
import "./Search.css";

export default function Search(props) {
  const [userInput, setUserInput] = useState("");
  const searchInput = useRef(null);

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
    </div>
  );
}
