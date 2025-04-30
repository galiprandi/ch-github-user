export interface UserDTO {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string | null;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string; // "User" | "Organization" etc.
  site_admin: boolean;
  score?: number; // Present in search results
}

export interface UserDetailedDTO extends UserDTO {
  name: string | null;
  company: string | null;
  blog: string | null;
  location: string | null;
  email: string | null;
  hireable: boolean | null;
  bio: string | null;
  twitter_username: string | null;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string; // ISO 8601 format
  updated_at: string; // ISO 8601 format
}

export interface UserRepoDTO {
  id: number;
  node_id: string;
  name: string;
  full_name: string;
  private: boolean;
  owner: UserDTO;
  html_url: string;
  description: string | null;
  fork: boolean;
  url: string;
  forks_url: string;
  keys_url: string;
  collaborators_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
}
