import { UserDTO, UserDetailedDTO, UserRepoDTO } from "../types/github";
import { vi, expect, describe, it, beforeEach } from "vitest";

import * as githubApi from "./githubApi";

const BASE_URL = "https://api.github.com";

const mockUser: UserDTO = {
  login: "testuser",
  id: 1,
  node_id: "test-node-id",
  avatar_url: "https://example.com/avatar",
  gravatar_id: "",
  url: "https://api.github.com/users/testuser",
  html_url: "https://github.com/testuser",
  followers_url: "https://api.github.com/users/testuser/followers",
  following_url:
    "https://api.github.com/users/testuser/following{/other_user}",
  gists_url: "https://api.github.com/users/testuser/gists{/gist_id}",
  starred_url: "https://api.github.com/users/testuser/starred{/owner}{/repo}",
  subscriptions_url: "https://api.github.com/users/testuser/subscriptions",
  organizations_url: "https://api.github.com/users/testuser/orgs",
  repos_url: "https://api.github.com/users/testuser/repos",
  events_url: "https://api.github.com/users/testuser/events{/privacy}",
  received_events_url:
    "https://api.github.com/users/testuser/received_events",
  type: "User",
  site_admin: false,
};

const mockUserDetails: UserDetailedDTO = {
  ...mockUser,
  name: "Test User",
  company: "Test Company",
  blog: "https://testuser.com",
  location: "Test Location",
  email: "testuser@example.com",
  hireable: true,
  bio: "Test bio",
  twitter_username: "testuser",
  public_repos: 10,
  public_gists: 5,
  followers: 100,
  following: 50,
  created_at: "2023-01-01T00:00:00Z",
  updated_at: "2023-01-01T00:00:00Z",
};

const mockRepo: UserRepoDTO = {
  id: 1,
  forks_url: "https://api.github.com/repos/testuser/test-repo/forks",
  keys_url: "https://api.github.com/repos/testuser/test-repo/keys{/key_id}",
  collaborators_url:
    "https://api.github.com/repos/testuser/test-repo/collaborators{/collaborator}",
  node_id: "test-repo-node-id",
  name: "test-repo",
  full_name: "testuser/test-repo",
  private: false,
  owner: mockUser,
  html_url: "https://github.com/testuser/test-repo",
  description: "Test repository",
  fork: false,
  url: "https://api.github.com/repos/testuser/test-repo",
  stargazers_count: 50,
  language: "TypeScript",
  forks_count: 20,
};

describe("GitHub API Functions", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    global.fetch = vi.fn();
  });

  describe("fetchInitialUsers", () => {
    it("should fetch initial users successfully", async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => [mockUser],
      });
      const result = await githubApi.fetchInitialUsers();
      expect(result).toStrictEqual([mockUser]);
      expect(fetch).toHaveBeenCalledWith(`${BASE_URL}/users`);
      expect(fetch).toHaveBeenCalledTimes(1);
    });

    it("should handle errors when fetch fails", async () => {
      global.fetch = vi.fn().mockResolvedValue({ ok: false, status: 500 });
      await expect(githubApi.fetchInitialUsers()).rejects.toThrow(
        "Error fetching initial users: 500"
      );
      expect(fetch).toHaveBeenCalledWith(`${BASE_URL}/users`);
      expect(fetch).toHaveBeenCalledTimes(1);
    });
  });

  describe("searchUsers", () => {
    it("should fetch users based on query", async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ items: [mockUser] }),
      });
      const result = await githubApi.searchUsers("testuser");
      expect(result).toStrictEqual([mockUser]);
      expect(fetch).toHaveBeenCalledWith(`${BASE_URL}/search/users?q=testuser`);
      expect(fetch).toHaveBeenCalledTimes(1);
    });

    it("should delegate to fetching initial users when query is empty", async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => [mockUser],
      });

      const result = await githubApi.searchUsers("");

      expect(result).toStrictEqual([mockUser]);
      expect(fetch).toHaveBeenCalledWith(`${BASE_URL}/users`);
      expect(fetch).toHaveBeenCalledTimes(1);
    });

    it("should handle errors during search", async () => {
      global.fetch = vi.fn().mockResolvedValue({ ok: false, status: 500 });
      await expect(githubApi.searchUsers("test")).rejects.toThrow(
        "Error searching users: 500"
      );
      expect(fetch).toHaveBeenCalledWith(`${BASE_URL}/search/users?q=test`);
      expect(fetch).toHaveBeenCalledTimes(1);
    });
  });

  describe("fetchUserDetails", () => {
    it("should fetch user details for a given username", async () => {
      global.fetch = vi.fn().mockResolvedValue({ ok: true, json: async () => mockUserDetails });
      const result = await githubApi.fetchUserDetails("testuser");
      expect(result).toStrictEqual(mockUserDetails);
      expect(fetch).toHaveBeenCalledWith(`${BASE_URL}/users/testuser`);
      expect(fetch).toHaveBeenCalledTimes(1);
    });

    it("should return null when user not found (404)", async () => {
      global.fetch = vi.fn().mockResolvedValue({ ok: false, status: 404 });
      const result = await githubApi.fetchUserDetails("nonexistent");
      expect(result).toBe(null);
      expect(fetch).toHaveBeenCalledWith(`${BASE_URL}/users/nonexistent`);
      expect(fetch).toHaveBeenCalledTimes(1);
    });

    it("should handle errors when fetching user details", async () => {
      global.fetch = vi.fn().mockResolvedValue({ ok: false, status: 500 });
      await expect(githubApi.fetchUserDetails("testuser")).rejects.toThrow(
        "Error fetching user details for testuser: 500"
      );
      expect(fetch).toHaveBeenCalledWith(`${BASE_URL}/users/testuser`);
      expect(fetch).toHaveBeenCalledTimes(1);
    });
  });

  describe("fetchUserRepos", () => {
    it("should fetch user repositories for a given username", async () => {
      global.fetch = vi.fn().mockResolvedValue({ ok: true, json: async () => [mockRepo] });
      const result = await githubApi.fetchUserRepos("testuser");
      expect(result).toStrictEqual([mockRepo]);
      expect(fetch).toHaveBeenCalledWith(`${BASE_URL}/users/testuser/repos`);
      expect(fetch).toHaveBeenCalledTimes(1);
    });

    it("should handle errors when fetching user repositories", async () => {
      global.fetch = vi.fn().mockResolvedValue({ ok: false, status: 500 });
      await expect(githubApi.fetchUserRepos("testuser")).rejects.toThrow(
        "Error fetching user repos for testuser: 500"
      );
      expect(fetch).toHaveBeenCalledWith(`${BASE_URL}/users/testuser/repos`);
      expect(fetch).toHaveBeenCalledTimes(1);
    });
  });
});
