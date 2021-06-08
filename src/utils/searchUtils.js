export default async function fetchSuggestData(userInput) {
  try {
    const json = await (
      await fetch(`http://localhost:3000/search?q=${userInput}`)
    ).json();
    return json.suggestions;
  } catch (e) {
    console.error("Failed to obtain suggest data:", e);
    return [];
  }
}
