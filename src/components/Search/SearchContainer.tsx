import { useState } from "react";
import SearchBar from "./SearchBar";
import SearchResult from "./SearchResult";
import { fetchResult } from "../../utils/api";
import { ISearchResult } from "../../types/index";

const SearchContainer = () => {
    const [result, setResult] = useState<ISearchResult[] | null>(null);

    const onSearch = (keyword: string) => {
        if (!keyword) return;

        fetchResult(keyword)?.then((data) => {
            if (!data) return;

            const regex = new RegExp(keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), "gi");

            const highlightedResults = data.map((item: ISearchResult) => ({
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
            <SearchBar onSearch={onSearch} />
            {result && <SearchResult result={result} />}
        </>
    );
};

export default SearchContainer;
