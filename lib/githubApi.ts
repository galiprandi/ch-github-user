import { UserDetailedDTO, UserDTO, UserRepoDTO } from "../types/github"; // Importa los tipos

const BASE_URL = "https://api.github.com";

export const fetchInitialUsers = async (): Promise<UserDTO[]> => {
  // Define el tipo de retorno
  try {
    const res = await fetch(`${BASE_URL}/users`);
    if (!res.ok) {
      throw new Error(`Error fetching initial users: ${res.status}`);
    }
    // La API /users devuelve un array de GitHubUserBasic
    const users: UserDTO[] = await res.json(); // Tipa el resultado
    return users;
  } catch (error) {
    console.error("Failed to fetch initial users:", error);
    // Es útil re-lanzar el error para que quien llame lo maneje
    throw error;
  }
};

export const searchUsers = async (query: string): Promise<UserDTO[]> => {
  // Tipa el parámetro y retorno
  if (!query) {
    // Si la búsqueda está vacía, podrías devolver la lista inicial o un array vacío
    // Aquí, volvemos a la lista inicial si la query está vacía
    return fetchInitialUsers(); // fetchInitialUsers ya devuelve Promise<UserDTO[]>
  }
  try {
    const res = await fetch(
      `${BASE_URL}/search/users?q=${encodeURIComponent(query)}`
    );
    if (!res.ok) {
      throw new Error(`Error searching users: ${res.status}`);
    }
    const data: { items: UserDTO[]; total_count: number } = await res.json(); // Tipa la estructura de respuesta
    return data.items; // items es un array de GitHubUserBasic
  } catch (error) {
    console.error(`Failed to search users for "${query}":`, error);
    throw error;
  }
};

export const fetchUserDetails = async (
  username: string
): Promise<UserDetailedDTO | null> => {
  // Tipa el parámetro y retorno (puede ser null)
  try {
    const res = await fetch(
      `${BASE_URL}/users/${encodeURIComponent(username)}`
    );
    if (!res.ok) {
      if (res.status === 404) {
        return null; // Usuario no encontrado, devuelve null
      }
      throw new Error(
        `Error fetching user details for ${username}: ${res.status}`
      );
    }
    const user: UserDetailedDTO = await res.json(); // Tipa el resultado
    return user; // Devuelve el objeto de usuario detallado
  } catch (error) {
    console.error(`Failed to fetch user details for "${username}":`, error);
    throw error;
  }
};

// Opcional: Función para obtener repositorios si decides mostrarlos
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
