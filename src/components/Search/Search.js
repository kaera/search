import { useEffect, useRef, useState } from "react";
import Suggest from "../Suggest/Suggest";
import "./Search.css";
import useDebounce from "../../hooks/useDebounce";

export default function Search(props) {
  const [userInput, setUserInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const searchInput = useRef(null);
  const debouncedSuggestions = useDebounce(userInput, 300);

  useEffect(() => {
    if (userInput && userInput.trim().length >= 2) {
      setSuggestions(debouncedSuggestions);
    } else {
      setSuggestions([]);
    }
  }, [debouncedSuggestions, userInput]);

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
      {userInput.trim() ? (
        <Suggest
          suggestions={suggestions || []}
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
