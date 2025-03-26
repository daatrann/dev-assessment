export interface ISearchBar {
    onSearch: (keyword: string) => void;
}

export interface ISearchResult {
    DocumentId: string;
    DocumentURI: string;
    DocumentExcerpt: { Text: string, Hightlight: string };
    DocumentTitle: { Text: string, Hightlight: string };
  }

  export interface ISearchResultResponse {
    Page: number;
    PageSize: number;
    TotalNumberOfResults: number;
    ResultItems: ISearchResultItem[];
  }
  
  export interface ISearchSuggestionResponse {
    stemmedQueryTerm: string;
    suggestions: string[];
  }