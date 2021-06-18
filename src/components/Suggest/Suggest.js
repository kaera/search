import "./Suggest.css";
import parse from "html-react-parser";

export default function Suggest(props) {
  const { suggestions, onSelect } = props;
  return (
    <div data-testid="Suggest">
      {suggestions.map((suggestion, i) => {
        return (
          <div
            key={i}
            className="suggest-item"
            onClick={() => {
              onSelect(suggestion.searchterm);
            }}
          >
            <span>{parse(`${suggestion.html}`)}</span>
            <span className="highlighted"> ({suggestion.nrResults})</span>
          </div>
        );
      })}
    </div>
  );
}
