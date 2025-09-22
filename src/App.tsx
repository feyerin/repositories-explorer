import { useState } from "react";
import SearchBar from "./components/SearchBar";
import UserAccordion from "./components/UserAccordion";
import Skeleton from "./components/Skeleton";
import { useSearchUsers } from "./hooks/useSearchUsers";
import type { GitHubUser } from "./types/github";

export default function App() {
  const [query, setQuery] = useState("");
  const { users, loading, error, searchUsers } = useSearchUsers();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col p-4">
      <div className="w-full max-w-sm mx-auto bg-white rounded-lg shadow p-4 flex flex-col flex-1">
        <h1 className="text-xl font-bold text-center mb-4">GitHub Explorer</h1>

        <SearchBar
          query={query}
          setQuery={setQuery}
          onSearch={() => searchUsers(query)}
          loading={loading}
        />

        {error && (
          <div className="mt-3 p-3 bg-red-100 text-red-700 text-sm rounded">
            {error}
          </div>
        )}

        <div className="mt-4 flex-1 flex flex-col justify-start space-y-3 overflow-y-auto">
          {loading && (
            <div className="flex-1 flex flex-col justify-center items-center">
              <Skeleton lines={5} />
            </div>
          )}

          {!loading &&
            users.map((user: GitHubUser) => (
              <UserAccordion key={user.login} user={user} />
            ))}

          {!loading && users.length === 0 && query && (
            <p className="text-center text-gray-500 text-sm mt-4 flex-1">
              No users found
            </p>
          )}

          {!query && !loading && (
            <p className="text-center text-gray-400 text-sm mt-4 flex-1">
              Start typing a username to search GitHub users
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
