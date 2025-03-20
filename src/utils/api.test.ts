import { describe, it, expect, vi, beforeEach } from "vitest";
import { fetchResult, fetchSuggestion } from "../utils/api";

// Mock environment variables
vi.stubGlobal("import.meta", {
  env: {
    VITE_API_ENDPOINT_RESULT: "https://mock-api.com/result",
    VITE_API_ENDPOINT_SUGGESTION: "https://mock-api.com/suggestion",
  },
});

// Mock fetch API
global.fetch = vi.fn();

describe("API Functions", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const mockResults = {
    ResultItems: [
      {
        DocumentId: "1",
        DocumentExcerpt: { Text: "A document about Singapore.", Highlight: "" },
        DocumentURI: "https://example.com/doc1",
        DocumentTitle: { Text: "Singapore Travel", Highlight: "" },
      },
      {
        DocumentId: "2",
        DocumentExcerpt: { Text: "Another document mentioning Singapore.", Highlight: "" },
        DocumentURI: "https://example.com/doc2",
        DocumentTitle: { Text: "Malaysia and Singapore", Highlight: "" },
      },
    ],
  };

  const mockSuggestions = {
    suggestions: ["Singapore", "Malaysia", "Thailand"],
  };

  it("fetchResult: returns filtered results based on keyword", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue(mockResults),
    });

    const result = await fetchResult("Singapore");

    expect(result).toHaveLength(2);
    expect(result?.[0].DocumentTitle.Text).toBe("Singapore Travel");
    expect(result?.[1].DocumentTitle.Text).toBe("Malaysia and Singapore");
  });

  it("fetchResult: returns null if ResultItems is missing", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue({}),
    });

    const result = await fetchResult("Singapore");

    expect(result).toBeNull();
  });

  it("fetchResult: handles API errors gracefully", async () => {
    (global.fetch as jest.Mock).mockRejectedValue(new Error("API failure"));

    const result = await fetchResult("Singapore");

    expect(result).toBeNull();
  });

  it("fetchSuggestion: returns filtered suggestions", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue(mockSuggestions),
    });

    const result = await fetchSuggestion("sing");

    expect(result).toHaveLength(1);
    expect(result?.[0]).toBe("Singapore");
  });

  it("fetchSuggestion: handles API errors gracefully", async () => {
    (global.fetch as jest.Mock).mockRejectedValue(new Error("API failure"));

    const result = await fetchSuggestion("sing");

    expect(result).toEqual([]);
  });
});
