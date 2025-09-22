import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import SearchBar from "../components/SearchBar";

describe("SearchBar Component", () => {
  it("renders input and button", () => {
    render(
      <SearchBar query="" setQuery={() => {}} onSearch={() => {}} loading={false} />
    );

    expect(screen.getByPlaceholderText(/Search GitHub users/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /search/i })).toBeInTheDocument();
  });

  it("updates query when typing", () => {
    const mockSetQuery = vi.fn();

    render(
      <SearchBar query="" setQuery={mockSetQuery} onSearch={() => {}} loading={false} />
    );

    fireEvent.change(screen.getByPlaceholderText(/Search GitHub users/i), {
      target: { value: "react" },
    });

    expect(mockSetQuery).toHaveBeenCalledWith("react");
  });

  it("calls onSearch when clicking button", () => {
    const mockOnSearch = vi.fn();

    render(
      <SearchBar
        query="vite"
        setQuery={() => {}}
        onSearch={mockOnSearch}
        loading={false}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: /search/i }));
    expect(mockOnSearch).toHaveBeenCalled();
  });

  it("calls onSearch when pressing Enter", () => {
    const mockOnSearch = vi.fn();

    render(
      <SearchBar
        query="vite"
        setQuery={() => {}}
        onSearch={mockOnSearch}
        loading={false}
      />
    );

    fireEvent.keyDown(screen.getByPlaceholderText(/Search GitHub users/i), {
      key: "Enter",
    });

    expect(mockOnSearch).toHaveBeenCalled();
  });

  it("clears query when pressing Escape", () => {
    const mockSetQuery = vi.fn();

    render(
      <SearchBar
        query="something"
        setQuery={mockSetQuery}
        onSearch={() => {}}
        loading={false}
      />
    );

    fireEvent.keyDown(screen.getByPlaceholderText(/Search GitHub users/i), {
      key: "Escape",
    });

    expect(mockSetQuery).toHaveBeenCalledWith("");
  });

  it("disables button when loading", () => {
    render(
      <SearchBar query="vite" setQuery={() => {}} onSearch={() => {}} loading={true} />
    );

    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
    expect(button).toHaveTextContent("...");
  });
});
