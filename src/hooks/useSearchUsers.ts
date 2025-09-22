import { useState } from "react";
import type { GitHubUser } from "../types/github";

export function useSearchUsers() {
  const [users, setUsers] = useState<GitHubUser[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchUsers = async (query: string) => {
    if (!query) return;
    setLoading(true);
    setError(null);
    setUsers([]);
    try {
      const res = await fetch(`https://api.github.com/search/users?q=${query}&per_page=5`);
      if (!res.ok) throw new Error("Failed to fetch users");
      const data = await res.json();
      setUsers(data.items || []);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return { users, loading, error, searchUsers };
}
