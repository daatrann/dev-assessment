import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import SearchContainer from "./SearchContainer";
import { fetchResult } from "../../utils/api";
import { ISearchResult } from "../../types";

// Mock fetchResult function
vi.mock("../../utils/api", () => ({
  fetchResult: vi.fn(),
}));

describe("SearchContainer Component", () => {
  const mockResults: ISearchResult[] = [
    {
      DocumentId: "1",
      DocumentExcerpt: {
        Text: "This is a sample document about Singapore.",
        Hightlight: "",
      },
      DocumentURI: "",
      DocumentTitle: {
        Text: "",
        Hightlight: "",
      },
    },
    {
      DocumentId: "2",
      DocumentExcerpt: {
        Text: "Singapore is a great place to visit.",
        Hightlight: "",
      },
      DocumentURI: "",
      DocumentTitle: {
        Text: "",
        Hightlight: "",
      },
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders SearchBar and SearchResult components", () => {
    render(<SearchContainer />);

    // Search bar should be present
    expect(screen.getByRole("textbox")).toBeInTheDocument();

    // Search result should show "No results found" initially
    expect(screen.getByText(/no results found/i)).toBeInTheDocument();
  });

  it("calls fetchResult when a keyword is entered", async () => {
    vi.mocked(fetchResult).mockResolvedValue(mockResults);

    render(<SearchContainer />);

    const searchInput = screen.getByRole("textbox");
    fireEvent.change(searchInput, { target: { value: "Singapore" } });
    fireEvent.keyDown(searchInput, { key: "Enter", code: "Enter" });

    // Wait for API call
    await waitFor(() => {
      expect(fetchResult).toHaveBeenCalledWith("Singapore");
    });
  });

  it("displays search results correctly", async () => {
    vi.mocked(fetchResult).mockResolvedValue(mockResults);

    render(<SearchContainer />);

    const searchInput = screen.getByRole("textbox");
    fireEvent.change(searchInput, { target: { value: "Singapore" } });
    fireEvent.keyDown(searchInput, { key: "Enter", code: "Enter" });

    // Wait for the search results to appear
    await waitFor(() => {
        expect(fetchResult).toHaveBeenCalledWith("Singapore");
    });
  });

  it("highlights the searched keyword in results", async () => {
    vi.mocked(fetchResult).mockResolvedValue(mockResults);

    render(<SearchContainer />);

    const searchInput = screen.getByRole("textbox");
    fireEvent.change(searchInput, { target: { value: "Singapore" } });
    fireEvent.keyDown(searchInput, { key: "Enter", code: "Enter" });

    // Wait for results to be displayed
    await waitFor(() => {
        expect(fetchResult).toHaveBeenCalledWith("Singapore");
      });
  });
});
