import { useState, useEffect, FormEvent, ChangeEvent } from "react"; // Importa tipos de eventos
import Link from "next/link";
import { fetchInitialUsers, searchUsers } from "../lib/githubApi";
import { useFavorites } from "../context/FavoritesContext";
import { UserDTO } from "../types/github"; // Importa el tipo de usuario básico
import Image from "next/image";
// import styles from '../styles/Home.module.css';

export default function Home() {
  // Tipa el estado 'users' como un array de GitHubUserBasic
  const [users, setUsers] = useState<UserDTO[]>([]);
  const [loading, setLoading] = useState<boolean>(false); // Tipa boolean
  const [error, setError] = useState<string | null>(null); // Tipa string o null
  const [searchTerm, setSearchTerm] = useState<string>(""); // Tipa string

  const { isFavorite, toggleFavorite } = useFavorites();

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
    // <div className={styles.container}> {/* Usa la clase del módulo */}
    <div>
      <h1>GitHub Users</h1>

      {/* <form className={styles.searchForm} onSubmit={handleSearch}> */}
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Buscar usuarios por nombre..."
          value={searchTerm}
          onChange={handleInputChange} // Usa la función tipada
        />
        <button type="submit">Buscar</button>
        {searchTerm && (
          <button
            type="button"
            onClick={() => {
              setSearchTerm("");
              // Opcional: Recargar lista inicial al limpiar
              setLoading(true);
              fetchInitialUsers()
                .then(setUsers)
                .catch(setError)
                .finally(() => setLoading(false));
            }}
          >
            Limpiar
          </button>
        )}
      </form>

      {loading && <p>Cargando usuarios...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && users.length === 0 && <p>No se encontraron usuarios.</p>}

      {/* Lista de Usuarios */}
      {/* <ul className={styles.userList}> */}
      <ul>
        {/* Tipa el parámetro 'user' en el map */}
        {users.map((user: UserDTO) => (
          // <li key={user.id} className={styles.userItem}>
          <li key={user.id}>
            <Image
              src={user.avatar_url}
              alt={`${user.login}'s avatar`}
              width={50}
              height={50}
              // className={styles.avatar}
              style={{ borderRadius: "50%", marginRight: "15px" }}
            />
            {/* <div className={styles.userInfo}> */}
            <div>
              {/* Enlace a la página de detalle */}
              <Link href={`/users/${user.login}`} legacyBehavior>
                {/* <a className={styles.userNameLink}> */}
                <a
                  style={{
                    fontWeight: "bold",
                    textDecoration: "none",
                    color: "blue",
                  }}
                >
                  {user.login}
                </a>
              </Link>
              {/* Botón o Icono de Favorito */}
              <button
                onClick={() => toggleFavorite(user.login)}
                // className={styles.favoriteButton}
                style={{
                  marginLeft: "10px",
                  cursor: "pointer",
                  backgroundColor: "transparent",
                  border: "none",
                  color: isFavorite(user.login) ? "gold" : "gray",
                }}
              >
                {isFavorite(user.login) ? "⭐️" : "☆"}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
