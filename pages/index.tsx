import { useState, useEffect, FormEvent } from "react";
import { fetchInitialUsers, searchUsers } from "../lib/githubApi";
import { UserDTO } from "../types/github";
import UserTable from "@/components/UserTable";
import { useFavorites } from "../context/FavoritesContext";

export default function Home() {
  const [users, setUsers] = useState<UserDTO[]>([]);
  const [loading, setLoading] = useState<boolean>(false); // Tipa boolean
  const [error, setError] = useState<string | null>(null); // Tipa string o null
  const [searchTerm, setSearchTerm] = useState<string>(""); // Tipa string

  const { isFavorite, toggleFavorite } = useFavorites();

  useEffect(() => {
    setLoading(true);
    fetchInitialUsers()
      .then((data: UserDTO[]) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err: unknown) => {
        setError("Error loading initial users.");
        setLoading(false);
        console.error(err);
      });
  }, []);

  const handleSearch = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const results: UserDTO[] = await searchUsers(searchTerm);
      setUsers(results);
    } catch (err: unknown) {
      setError("Error al buscar usuarios.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <form onSubmit={handleSearch}>
        <fieldset role="group">
          <input
            type="search"
            placeholder="Search users"
            value={searchTerm}
            onChange={({ target: { value } }) => setSearchTerm(value)}
          />
        </fieldset>
      </form>

      <br />

      {error && <p style={{ color: "red" }}>{error}</p>}
      {loading && users.length === 0 && (
        <p aria-busy="true">Loading users...</p>
      )}

      {!loading && users.length === 0 && searchTerm !== "" && (
        <p>No users found for &quot;{searchTerm}&quot;.</p>
      )}

      {!loading && users.length > 0 && (
        <UserTable
          users={users}
          isFavorite={isFavorite}
          toggleFavorite={toggleFavorite}
        />
      )}

      {loading && users.length > 0 && (
        <p aria-busy="true" style={{ textAlign: "center", marginTop: "20px" }}>
          Updating list...
        </p>
      )}
    </section>
  );
}
