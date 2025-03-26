import { useState } from "react";
import SearchBar from "./SearchBar";
import SearchResult from "./SearchResult";
import { fetchResult } from "../../utils/api";
import { ISearchResult } from "../../types/index";

const SearchContainer = () => {
    const [result, setResult] = useState<ISearchResult[] | undefined>();
    const [error, setError] = useState<string | unknown>(null);

    const onSearch = (keyword: string) => {
        if (!keyword) return;

        fetchResult(keyword)?.then(({ error, data }) => {
            setError(error);
            const regex = new RegExp(keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), "gi");

            const highlightedResults = data?.map((item: ISearchResult) => ({
                ...item,
                DocumentExcerpt: {
                    ...item.DocumentExcerpt,
                    Text: item.DocumentExcerpt.Text.replace(regex, (match) => `<b>${match}</b>`)
                }
            }));

            setResult(highlightedResults);
        });
    };

    return (
        <>
            <SearchBar onSearch={onSearch} onError={setError} />
            {result && <SearchResult result={result} />}
            {!!error && <p className="mt-10 text-center text-red-500">Network error. Please try again later!</p>}
        </>
    );
};

export default SearchContainer;
