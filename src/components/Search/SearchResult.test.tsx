import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import SearchResult from "./SearchResult";
import { ISearchResult } from "../../types";

describe("SearchResult Component", () => {
  const mockResults: ISearchResult[] = [
    {
      DocumentId: "1",
      DocumentExcerpt: {
        Text: "This is a <b>sample</b> document about Singapore.",
        Hightlight: ""
      },
      DocumentURI: "https://example.com/document1",
      DocumentTitle: {
        Text: "Document 1",
        Hightlight: ""
      }
    },
    {
      DocumentId: "2",
      DocumentExcerpt: {
        Text: "Singapore is a <b>great</b> place to visit.",
        Hightlight: ""
      },
      DocumentURI: "https://example.com/document2",
      DocumentTitle: {
        Text: "Document 2",
        Hightlight: ""
      }
    },
  ];

  it("renders 'No results found' when no data is provided", () => {
    render(<SearchResult result={null} />);
    
    expect(screen.getByText(/No results found/i)).toBeInTheDocument();
  });

  it("displays the correct number of search results", () => {
    render(<SearchResult result={mockResults} />);
    
    expect(screen.getByText(/Showing 2 of 2 results/i)).toBeInTheDocument();
  });

  it("renders document titles as clickable links", () => {
    render(<SearchResult result={mockResults} />);

    const firstLink = screen.getByText("Document 1");
    expect(firstLink).toBeInTheDocument();
    expect(firstLink).toHaveAttribute("href", "https://example.com/document1");

    const secondLink = screen.getByText("Document 2");
    expect(secondLink).toBeInTheDocument();
    expect(secondLink).toHaveAttribute("href", "https://example.com/document2");
  });

  it("renders document excerpts with highlighted text", () => {
    render(<SearchResult result={mockResults} />);

    const firstExcerpt = screen.getByTestId("excerpt-1");
    expect(firstExcerpt.innerHTML).toContain("<b>sample</b>");

    const secondExcerpt = screen.getByTestId("excerpt-2");
    expect(secondExcerpt.innerHTML).toContain("<b>great</b>");
  });

  it("renders document URIs correctly", () => {
    render(<SearchResult result={mockResults} />);

    expect(screen.getByText("https://example.com/document1")).toBeInTheDocument();
    expect(screen.getByText("https://example.com/document2")).toBeInTheDocument();
  });
});
