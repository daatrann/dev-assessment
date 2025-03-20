const RESULT_URL = import.meta.env.VITE_API_ENDPOINT_RESULT;
const SUGGESTION_URL = import.meta.env.VITE_API_ENDPOINT_SUGGESTION;
import {ISearchResult} from "../types/index"

export const fetchResult = async (keyword: string) => {
  try {
    const response = await fetch(RESULT_URL);
    const data = await response.json();  
    if(!data.ResultItems) return null
    return data.ResultItems.filter((item: ISearchResult) => item.DocumentTitle.Text.toLowerCase().includes(keyword.toLowerCase()));
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const fetchSuggestion = async (keyword: string) => {
  try {
    const response = await fetch(SUGGESTION_URL);
    const data = await response.json();  
    return data.suggestions.filter((item: string) => item.toLowerCase().includes(keyword.toLowerCase()));
  } catch (error) {
    console.error(error);
    return [];
  }
};
