import "./Suggest.css";

export default function Suggest(props) {
  const { userInput, suggestions, onSelect } = props;
  return (
    <div data-testid="Suggest">
      {suggestions.map((suggestion, i) => {
        const inputIndex = suggestion.searchterm.indexOf(userInput);
        return (
          <div
            key={i}
            className="suggest-item"
            onClick={() => {
              onSelect(suggestion.searchterm);
            }}
          >
            <span>{suggestion.searchterm.slice(0, inputIndex)}</span>
            <strong>{userInput}</strong>
            <span>
              {suggestion.searchterm.slice(inputIndex + userInput.length)}
            </span>
            <span className="highlighted"> ({suggestion.nrResults})</span>
          </div>
        );
      })}
    </div>
  );
}
