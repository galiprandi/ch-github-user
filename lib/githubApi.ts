import { UserDetailedDTO, UserDTO, UserRepoDTO } from "../types/github";

const BASE_URL = "https://api.github.com";

export const fetchInitialUsers = async (): Promise<UserDTO[]> => {
  try {
    const res = await fetch(`${BASE_URL}/users`);
    if (!res.ok) {
      throw new Error(`Error fetching initial users: ${res.status}`);
    }
    const users: UserDTO[] = await res.json();
    return users;
  } catch (error) {
    console.error("Failed to fetch initial users:", error);
    throw error;
  }
};

export const searchUsers = async (query: string): Promise<UserDTO[]> => {
  if (!query) return fetchInitialUsers();

  try {
    const res = await fetch(
      `${BASE_URL}/search/users?q=${encodeURIComponent(query)}`
    );
    if (!res.ok) {
      throw new Error(`Error searching users: ${res.status}`);
    }
    const data: { items: UserDTO[]; total_count: number } = await res.json();
    return data.items;
  } catch (error) {
    console.error(`Failed to search users for "${query}":`, error);
    throw error;
  }
};

export const fetchUserDetails = async (
  username: string
): Promise<UserDetailedDTO | null> => {
  try {
    const res = await fetch(
      `${BASE_URL}/users/${encodeURIComponent(username)}`
    );
    if (!res.ok) {
      if (res.status === 404) return null;

      throw new Error(
        `Error fetching user details for ${username}: ${res.status}`
      );
    }
    const user: UserDetailedDTO = await res.json();
    return user;
  } catch (error) {
    console.error(`Failed to fetch user details for "${username}":`, error);
    throw error;
  }
};

export const fetchUserRepos = async (
  username: string
): Promise<UserRepoDTO[]> => {
  try {
    const res = await fetch(
      `${BASE_URL}/users/${encodeURIComponent(username)}/repos`
    );
    if (!res.ok) {
      throw new Error(
        `Error fetching user repos for ${username}: ${res.status}`
      );
    }
    const repos: UserRepoDTO[] = await res.json();
    return repos;
  } catch (error) {
    console.error(`Failed to fetch user repos for "${username}":`, error);
    throw error;
  }
};
