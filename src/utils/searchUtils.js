export default async function fetchSuggestData(query) {
  try {
    const json = await (
      await fetch(`http://localhost:3000/search?q=${query}`)
    ).json();
    return json.suggestions;
  } catch (e) {
    console.error("Failed to obtain suggest data:", e);
    return [];
  }
}
