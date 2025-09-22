import { useState } from "react";
import { useUserRepos } from "../hooks/useUserRepos";
import type { GitHubUser, GitHubRepo } from "../types/github";
import Skeleton from "./Skeleton";
import { FiChevronUp, FiChevronDown } from "react-icons/fi";

interface UserAccordionProps {
  user: GitHubUser;
}

export default function UserAccordion({ user }: UserAccordionProps) {
  const [open, setOpen] = useState(false);
  const { repos, loading, error, fetchRepos } = useUserRepos();

  const toggleAccordion = () => {
    setOpen((prev) => !prev);
    if (!open && repos.length === 0) fetchRepos(user.login);
  };

  return (
    <div className="bg-white rounded-lg shadow p-3 border">
      <div
        className="flex items-center justify-between cursor-pointer"
        onClick={toggleAccordion}
      >
        <div className="flex items-center gap-3">
          <img
            src={user.avatar_url}
            alt={user.login}
            className="w-10 h-10 rounded-full"
          />
          <div>
            <p className="font-medium text-sm">{user.login}</p>
            <a
              href={user.html_url}
              target="_blank"
              rel="noreferrer"
              className="text-xs text-blue-500"
              onClick={(e) => e.stopPropagation()}
            >
              View profile
            </a>
          </div>
        </div>
        <span className="text-gray-400">
          {open ? (
            <FiChevronUp aria-label="chevron-up" />
          ) : (
            <FiChevronDown aria-label="chevron-down" />
          )}
        </span>
      </div>

      {open && (
        <div className="mt-3 border-t pt-3">
          {loading && <Skeleton lines={4} />}
          {error && <p className="text-sm text-red-500">Error: {error}</p>}
          {!loading && repos.length === 0 && (
            <p className="text-sm text-gray-500">No repositories found</p>
          )}
          <ul className="space-y-2">
            {repos.map((repo: GitHubRepo) => (
              <li
                key={repo.id}
                className="bg-gray-100 rounded p-3 flex flex-col hover:bg-gray-200 cursor-pointer"
                onClick={() => window.open(repo.html_url, "_blank")}
              >
                <div className="flex justify-between items-start gap-2">
                  <span
                    className="font-medium text-sm truncate max-w-[65%]"
                    title={repo.name}
                  >
                    {repo.name}
                  </span>
                  <div className="flex items-center gap-1 text-yellow-500 text-sm font-medium flex-shrink-0">
                    <span>{repo.stargazers_count}</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.955a1 1 0 00.95.69h4.163c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.955c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.176 0l-3.37 2.448c-.784.57-1.838-.197-1.539-1.118l1.286-3.955a1 1 0 00-.364-1.118L2.07 9.382c-.784-.57-.38-1.81.588-1.81h4.163a1 1 0 00.95-.69l1.286-3.955z" />
                    </svg>
                  </div>
                </div>
                {repo.description && (
                  <p
                    className="text-xs text-gray-700 mt-1 line-clamp-2"
                    title={repo.description}
                  >
                    {repo.description}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
