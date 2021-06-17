import { useEffect, useState } from "react";
import fetchSuggestData from "../utils/searchUtils";

export default function useDebounce(query, delay) {
  const [debouncedValue, setDebouncedValue] = useState(query);
  useEffect(() => {
    const handler = setTimeout(async () => {
      const suggestions = await fetchSuggestData(query);
      setDebouncedValue(suggestions);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [query, delay]);
  return debouncedValue;
}
