import {
  ISearchResult,
  ISearchResultResponse,
  ISearchSuggestionResponse,
} from "../types/index";

export const mockFilterSuggestions = (
  data: ISearchSuggestionResponse,
  keyword: string
) => {
  if (
    keyword.toLowerCase().toLowerCase().includes(data.stemmedQueryTerm) ||
    data.stemmedQueryTerm.toLowerCase().includes(keyword.toLowerCase())
  ) {
    return data.suggestions.filter((item: string) =>
      item.toLowerCase().includes(keyword.toLowerCase())
    );
  }
  return [];
};

export const mockFilterResult = (
  data: ISearchResultResponse,
  keyword: string
) => {
  return data.ResultItems.filter((item: ISearchResult) =>
    item.DocumentTitle.Text.toLowerCase().includes(keyword.toLowerCase())
  );
};
