export default function highlightSuggestions(data, userInput) {
  return (data || []).map((suggestion) => {
    return {
      ...suggestion,
      html: suggestion.searchterm.replace(
        new RegExp(userInput, "gi"),
        (match) => `<strong>${match}</strong>`
      ),
    };
  });
}
