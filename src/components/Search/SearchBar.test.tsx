import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import SearchBar from "./SearchBar";

vi.mock("../../utils/api", () => ({
    fetchSuggestion: vi.fn(() => Promise.resolve(["apple", "banana", "orange"]))
}));

describe("SearchBar Component", () => {
    const mockOnSearch = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("calls fetchSuggestion when typing in the input", async () => {
        render(<SearchBar onSearch={mockOnSearch} />);
        const input = screen.getByRole("textbox");
        await userEvent.type(input, "app");
        
        await waitFor(() => {
          expect(screen.getByText((_, element) => element?.textContent === "apple")).toBeInTheDocument();
      });
    });

    it("calls onSearch when search button is clicked", async () => {
        render(<SearchBar onSearch={mockOnSearch} />);
        const input = screen.getByRole("textbox");
        await userEvent.type(input, "test");
        
        const searchButton = screen.getByRole("button", { name: /search/i });
        await userEvent.click(searchButton);
        
        expect(mockOnSearch).toHaveBeenCalledWith("test");
    });

    it("displays suggestion dropdown when user types more than 2 characters", async () => {
        render(<SearchBar onSearch={mockOnSearch} />);
        const input = screen.getByRole("textbox");
        await userEvent.type(input, "app");
        
        await waitFor(() => {
          expect(screen.getByText((_, element) => element?.textContent === "apple")).toBeInTheDocument();
      });
    });

    it("selects a suggestion when clicked", async () => {
        render(<SearchBar onSearch={mockOnSearch} />);
        const input = screen.getByRole("textbox");
        await userEvent.type(input, "app");
        
        const suggestion = await screen.findByText((_, element) =>
          element?.textContent === "apple"
      );
      
        await userEvent.click(suggestion);
        
        expect(input).toHaveValue("apple");
        expect(mockOnSearch).toHaveBeenCalledWith("apple");
    });

    it("navigates suggestions with arrow keys and selects with Enter", async () => {
        render(<SearchBar onSearch={mockOnSearch} />);
        const input = screen.getByRole("textbox");
        await userEvent.type(input, "app");

        await waitFor(() => {
          expect(screen.getByText((_, element) =>
              element?.textContent === "apple"
          )).toBeInTheDocument();
      });

        fireEvent.keyDown(input, { key: "ArrowDown" });
        fireEvent.keyDown(input, { key: "Enter" });
        
        expect(mockOnSearch).toHaveBeenCalledWith("apple");
    });

    it("clears input and hides suggestions when clear button is clicked", async () => {
        render(<SearchBar onSearch={mockOnSearch} />);
        const input = screen.getByRole("textbox");
        await userEvent.type(input, "app");
        const clearButton = screen.getByRole("button", { name: /clear/i });
        await userEvent.click(clearButton);
        
        expect(input).toHaveValue("");
        expect(screen.queryByText("apple")).not.toBeInTheDocument();
    });
});
