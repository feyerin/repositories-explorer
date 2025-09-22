import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import App from "../App";

vi.mock("../hooks/useSearchUsers", () => {
  return {
    useSearchUsers: () => mockUseSearchUsers(),
  };
});

let mockUsers: any[] = [];
let mockLoading = false;
let mockError: string | null = null;
const mockSearchUsers = vi.fn();

const mockUseSearchUsers = () => ({
  users: mockUsers,
  loading: mockLoading,
  error: mockError,
  searchUsers: mockSearchUsers,
});

describe("App Component", () => {
  beforeEach(() => {
    mockUsers = [];
    mockLoading = false;
    mockError = null;
    mockSearchUsers.mockClear();
  });

  it("renders title and search bar", () => {
    render(<App />);
    expect(screen.getByText(/github explorer/i)).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/search github users/i)
    ).toBeInTheDocument();
  });

  it("calls searchUsers when clicking search button", () => {
    render(<App />);
    const input = screen.getByPlaceholderText(/search github users/i);
    fireEvent.change(input, { target: { value: "octocat" } });
    fireEvent.click(screen.getByRole("button", { name: /search/i }));

    expect(mockSearchUsers).toHaveBeenCalledWith("octocat");
  });

  it("shows skeleton when loading", () => {
    mockLoading = true;
    render(<App />);
    expect(screen.getByTestId("skeleton")).toBeInTheDocument();
  });

  it("renders error message when error occurs", () => {
    mockError = "Something went wrong";
    render(<App />);
    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
  });

  it("renders 'No users found' when no results", () => {
    render(<App />);
    const input = screen.getByPlaceholderText(/search github users/i);
    fireEvent.change(input, { target: { value: "nonexistent" } });
    fireEvent.click(screen.getByRole("button", { name: /search/i }));

    expect(screen.getByText(/no users found/i)).toBeInTheDocument();
  });

  it("renders 'Start typing' message when query is empty", () => {
    render(<App />);
    expect(
      screen.getByText(/start typing a username to search github users/i)
    ).toBeInTheDocument();
  });
});
