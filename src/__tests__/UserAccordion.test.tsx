import { render, screen, fireEvent } from "@testing-library/react";
import UserAccordion from "../components/UserAccordion";
import type { GitHubUser } from "../types/github";

vi.mock("../hooks/useUserRepos", () => ({
  useUserRepos: () => ({
    repos: [],
    loading: false,
    error: null,
    fetchRepos: vi.fn(),
  }),
}));

const mockUser: GitHubUser = {
  login: "octocat",
  avatar_url: "https://github.com/images/error/octocat_happy.gif",
  html_url: "https://github.com/octocat",
};

describe("UserAccordion", () => {
  test("renders user info", () => {
    render(<UserAccordion user={mockUser} />);
    expect(screen.getByText("octocat")).toBeInTheDocument();
    expect(screen.getByText("View profile")).toBeInTheDocument();
  });

  test("shows chevron-down by default", () => {
    render(<UserAccordion user={mockUser} />);
    expect(screen.getByLabelText("chevron-down")).toBeInTheDocument();
  });

  test("toggles to chevron-up when clicked", () => {
    render(<UserAccordion user={mockUser} />);
    fireEvent.click(screen.getByText("octocat"));
    expect(screen.getByLabelText("chevron-up")).toBeInTheDocument();
  });

  test("shows 'No repositories found' when open and repos empty", () => {
    render(<UserAccordion user={mockUser} />);
    fireEvent.click(screen.getByText("octocat"));
    expect(
      screen.getByText("No repositories found")
    ).toBeInTheDocument();
  });
});
