const RESULT_URL = import.meta.env.VITE_API_ENDPOINT_RESULT;
const SUGGESTION_URL = import.meta.env.VITE_API_ENDPOINT_SUGGESTION;
import { mockFilterResult, mockFilterSuggestions } from "../mocks/mock-filter";
export const fetchResult = async (keyword: string) => {
  try {
    const response = await fetch(RESULT_URL);
    const data = await response.json();
    if (!data.ResultItems) return { error: null, data: null };
    return {error: null, data: mockFilterResult(data, keyword)}
  } catch (error) {
    return { error, data: null };
  }
};

export const fetchSuggestion = async (keyword: string) => {
  try {
    const response = await fetch(SUGGESTION_URL);
    const data = await response.json();
    return mockFilterSuggestions(data, keyword)
  } catch (error) {
    console.error(error);
  }
};
