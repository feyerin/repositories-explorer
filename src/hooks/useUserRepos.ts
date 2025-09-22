import { useState } from "react";
import type { GitHubRepo } from "../types/github";

export function useUserRepos() {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRepos = async (username: string) => {
    if (!username) return;
    setLoading(true);
    setError(null);
    setRepos([]);
    try {
      const res = await fetch(`https://api.github.com/users/${username}/repos`);
      if (!res.ok) throw new Error("Failed to fetch repos");
      const data = await res.json();
      setRepos(data || []);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return { repos, loading, error, fetchRepos };
}
