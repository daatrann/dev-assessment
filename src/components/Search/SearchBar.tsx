import { useEffect, useMemo, useRef, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { MdClear } from "react-icons/md";
import { debounce } from "lodash";
import { fetchSuggestion } from "../../utils/api";

interface ISearchBar {
    onSearch: (keyword: string) => void;
    onError?: (error: string) => void;
}

const SearchBar = ({ onSearch }: ISearchBar) => {
    const [showSuggestion, setShowSuggestion] = useState(false);
    const [showClear, setShowClear] = useState(false);
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [inputValue, setInputValue] = useState("");
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    const debounceInput = useMemo(
        () =>
            debounce((e) => {
                fetchSuggestion(e.target.value).then((data) => {
                    if (data) {
                        setSuggestions(data);
                        setShowSuggestion(true);
                        setSelectedIndex(-1);
                    } else {
                        setShowSuggestion(false);
                    }
                });
            }, 300),
        []
    );

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
        if (e.target.value.length > 2) {
            debounceInput(e);
        }else if(e.target.value.length > 0){
            setShowClear(true);
        } else {
            setShowSuggestion(false);
            setShowClear(false);
        }
    };

    const handleClear = () => {
        setInputValue("");
        setShowSuggestion(false);
        setShowClear(false);
        inputRef.current?.focus();
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "ArrowDown") {
            setSelectedIndex((prevIndex) =>
                prevIndex < suggestions.length - 1 ? prevIndex + 1 : 0
            );
        } else if (e.key === "ArrowUp") {
            setSelectedIndex((prevIndex) =>
                prevIndex > 0 ? prevIndex - 1 : suggestions.length - 1
            );
        } else if (e.key === "Enter") {
            if (selectedIndex >= 0 && selectedIndex < suggestions.length) {
                onSearch(suggestions[selectedIndex]);
                setInputValue(suggestions[selectedIndex]);
                setShowSuggestion(false);
            } else {
                onSearch(inputValue);
                setShowSuggestion(false);
            }
        }
    };

    const handleSuggestionClick = (suggestion: string) => {
        setInputValue(suggestion);
        setShowSuggestion(false);
        onSearch(suggestion);
    };

    const highlightMatch = (text: string, query: string) => {
        if (!query) return text;
        const regex = new RegExp(`(${query})`, "gi");
        return text.replace(regex, "<strong>$1</strong>");
    };

    return (
        <div className="flex w-full justify-center items-center py-10 shadow-lg">
            <div className="flex sm:flex-row items-center border border-gray-400 hover:border-blue-600 rounded-lg w-full sm:w-3/4 relative">
                <div className="flex items-center w-9/10 rounded-lg">
                    <input
                        type="text"
                        ref={inputRef}
                        value={inputValue}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                        className="flex-grow px-3 py-2 focus:outline-none text-sm sm:text-base rounded-lg"
                    />
                    {showClear && (
                        <button
                            aria-label="clear"
                            onClick={handleClear}
                            className="cursor-pointer p-1"
                        >
                            <MdClear />
                        </button>
                    )}
                </div>
                <button
                    onClick={() => onSearch(inputValue)}
                    className="flex items-center w-1/10 sm:w-1/10 px-5 py-2 sm:ml-2 bg-primary text-white rounded-md bg-[#1C76D5] focus:outline-none justify-center cursor-pointer hover:bg-blue-600"
                >
                    <FaSearch />
                    <span className="ml-2">Search</span>
                </button>
                {showSuggestion && (
                    <ul className="absolute w-9/10 rounded-b-lg shadow-lg bg-white flex flex-col top-full">
                        {suggestions.map((suggestion, index) => (
                            <li
                                key={index}
                                className={`px-3 py-1 hover:bg-gray-100 cursor-pointer ${selectedIndex === index ? "bg-blue-200" : ""
                                    }`}
                                onMouseEnter={() => setSelectedIndex(index)}
                                onClick={() => handleSuggestionClick(suggestion)}
                                dangerouslySetInnerHTML={{
                                    __html: highlightMatch(suggestion, inputValue),
                                }}
                            />
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default SearchBar;
