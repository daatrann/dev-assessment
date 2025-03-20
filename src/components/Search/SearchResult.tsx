import { ISearchResult } from "../../types/index";

interface SearchResultsProps {
  result: ISearchResult[] | null;
}

const SearchResult = ({ result }: SearchResultsProps) => {
  const hasResults = result && result.length > 0;

  return (
    <div className="py-10 w-full flex justify-center">
      <div className="w-9/10 px-4 sm:px-0 sm:w-3/4">
        {hasResults ? (
          <div className="text-gray-800 font-semibold mb-8 text-lg">
            {`Showing ${result.length} of ${result.length} results`}
          </div>
        ) : (
          <p className="text-center text-gray-600">No results found</p>
        )}

        {result?.map((item) => (
          <div key={item.DocumentId} className="mb-6">
            <a
              href={item.DocumentURI}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary text-blue-500 text-lg font-semibold hover:underline block"
            >
              {item.DocumentTitle.Text}
            </a>
            <p
              className="text-gray-700 text-sm mt-1"
              data-testid={`excerpt-${item.DocumentId}`}
              dangerouslySetInnerHTML={{ __html: item.DocumentExcerpt.Text }}
            />
            <a
              href={item.DocumentURI}
              className="text-gray-500 hover:text-gray-600 text-xs mt-1 block break-words"
            >
              {item.DocumentURI}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResult;
