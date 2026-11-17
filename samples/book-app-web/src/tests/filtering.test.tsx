import { describe, expect, it } from "vitest";
import { filterBooks, type BookFiltersState } from "../App";
import { books } from "../data/books";

const defaultFilters: BookFiltersState = {
  searchTerm: "",
  selectedGenre: "all",
  readingStatus: "all"
};

describe("filterBooks", () => {
  it("matches title and author searches without depending on letter case", () => {
    const results = filterBooks(books, {
      ...defaultFilters,
      searchTerm: "hobbit"
    });

    expect(results.map((book) => book.title)).toEqual(["The Hobbit"]);
  });

  it("returns the same results for uppercase and lowercase searches", () => {
    for (const term of ["hobbit", "tolkien"]) {
      const lower = filterBooks(books, { ...defaultFilters, searchTerm: term.toLowerCase() });
      const upper = filterBooks(books, { ...defaultFilters, searchTerm: term.toUpperCase() });

      expect(lower.length).toBeGreaterThan(0);
      expect(upper).toEqual(lower);
    }
  });

  it("filters by genre and reading status together", () => {
    const results = filterBooks(books, {
      ...defaultFilters,
      selectedGenre: "Fantasy",
      readingStatus: "unread"
    });

    expect(results.map((book) => book.title)).toEqual(["The Night Circus"]);
  });
});
