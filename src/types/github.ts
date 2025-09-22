export interface GitHubUser {
  login: string;
  avatar_url: string;
  html_url: string;
}

export interface GitHubRepo {
  id: number;
  name: string;
  html_url: string;
  description?: string;
  stargazers_count: number;
}
