export interface ISearchBar {
    onSearch: (keyword: string) => void;
}

export interface ISearchResult {
    DocumentId: string;
    DocumentURI: string;
    DocumentExcerpt: { Text: string, Hightlight: string };
    DocumentTitle: { Text: string, Hightlight: string };
  }