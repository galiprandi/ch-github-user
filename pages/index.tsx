import { useState, useEffect, FormEvent, ChangeEvent } from "react";
import { fetchInitialUsers, searchUsers } from "../lib/githubApi";
import { UserDTO } from "../types/github";
import UserTable from "@/components/UserTable";

export default function Home() {
  const [users, setUsers] = useState<UserDTO[]>([]);
  const [loading, setLoading] = useState<boolean>(false); // Tipa boolean
  const [error, setError] = useState<string | null>(null); // Tipa string o null
  const [searchTerm, setSearchTerm] = useState<string>(""); // Tipa string

  // Carga Inicial de Usuarios (CSR) - Tipa la data recibida
  useEffect(() => {
    setLoading(true);
    fetchInitialUsers()
      .then((data: UserDTO[]) => {
        // Tipa 'data'
        setUsers(data);
        setLoading(false);
      })
      .catch((err: unknown) => {
        // Puedes tipar 'err' de forma más específica si conoces su estructura
        setError("Error al cargar usuarios iniciales.");
        setLoading(false);
        console.error(err);
      });
  }, []);

  // Lógica de Búsqueda (CSR) - Tipa el evento del formulario
  const handleSearch = async (e: FormEvent<HTMLFormElement>) => {
    // Tipa el evento
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const results: UserDTO[] = await searchUsers(searchTerm); // Tipa 'results'
      setUsers(results);
    } catch (err: unknown) {
      setError("Error al buscar usuarios.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Tipa el evento del input
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <>
      <form onSubmit={handleSearch}>
        <fieldset role="group">
          <input
            type="search"
            placeholder="Search users"
            value={searchTerm}
            onChange={handleInputChange}
          />
        </fieldset>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && users.length === 0 && <p>No se encontraron usuarios.</p>}

      <UserTable users={users} />
    </>
  );
}
