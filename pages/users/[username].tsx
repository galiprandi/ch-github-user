// pages/users/[username].tsx
import { fetchUserDetails } from "../../lib/githubApi";
import { useFavorites } from "../../context/FavoritesContext";
import Link from "next/link";
import type { GetServerSideProps, NextPage } from "next"; // Importa tipos de Next.js
import type { ParsedUrlQuery } from "querystring"; // Importa tipo de querystring
import { UserDetailedDTO } from "../../types/github"; // Importa el tipo de usuario detallado
import Image from "next/image";
// import styles from '../../styles/UserDetails.module.css';

// Define el tipo de los parámetros esperados en la URL
interface Params extends ParsedUrlQuery {
  username: string;
}

// Define el tipo de las props que este componente de página recibirá
interface UserDetailsProps {
  user?: UserDetailedDTO; // Puede ser undefined si hay un error o notFound
  error?: string; // Puede contener un mensaje de error
}

// Define el tipo para getServerSideProps, especificando los tipos de Props y Params
export const getServerSideProps: GetServerSideProps<
  UserDetailsProps,
  Params
> = async (context) => {
  // TypeScript sabe que context.params tiene la forma de Params
  const { username } = context.params!; // Usa ! porque sabemos que username estará presente debido a la ruta dinámica

  try {
    const user = await fetchUserDetails(username);

    // Si el usuario no se encuentra, retorna 404
    if (!user) {
      return {
        notFound: true,
      };
    }

    // Pasa los datos del usuario como props tipadas
    return {
      props: {
        user, // 'user' aquí es de tipo GitHubUserDetailed | null, pero si no es null llegamos aquí
      },
    };
  } catch (error: unknown) {
    console.error("Error fetching user details in getServerSideProps:", error);
    return {
      props: {
        error: "Error al cargar los detalles del usuario.",
      },
    };
  }
};

// Componente de la Página - Tipado
// Puedes usar NextPage<UserDetailsProps> o simplemente tipar las props
const UserDetailsPage: NextPage<UserDetailsProps> = ({ user, error }) => {
  const { isFavorite, toggleFavorite } = useFavorites();

  if (error) {
    return (
      <div>
        <h1>Error</h1>
        <p>{error}</p>
        <Link href="/" legacyBehavior>
          <a>Volver a la lista</a>
        </Link>
      </div>
    );
  }

  if (!user) {
    // Esto maneja el caso notFound=true en getServerSideProps,
    // aunque Next.js normalmente ya muestra su página 404 por defecto.
    // Si llegamos aquí por algún otro motivo donde 'user' es undefined,
    // también lo manejamos.
    return (
      <div>
        <p>Usuario no encontrado.</p>
        <Link href="/" legacyBehavior>
          <a>Volver a la lista</a>
        </Link>
      </div>
    );
  }

  return (
    <div>
      <Link href="/" legacyBehavior>
        <a>← Volver a la lista</a>
      </Link>
      <h1>Detalles de {user.login}</h1> {/* user es GitHubUserDetailed aquí */}
      <div style={{ display: "flex", alignItems: "center", margin: "20px 0" }}>
        <Image
          src={user.avatar_url}
          alt={`${user.login}'s avatar`}
          width={150}
          height={150}
          style={{ borderRadius: "50%", marginRight: "20px" }}
        />
        <div>
          {/* Accede a propiedades tipadas */}
          <h2>{user.name || user.login}</h2>
          {user.bio && (
            <p>
              <strong>Bio:</strong> {user.bio}
            </p>
          )}
          <p>
            <strong>Seguidores:</strong> {user.followers}
          </p>
          <p>
            <strong>Siguiendo:</strong> {user.following}
          </p>
          <p>
            <strong>Repositorios Públicos:</strong> {user.public_repos}
          </p>
          {user.location && (
            <p>
              <strong>Ubicación:</strong> {user.location}
            </p>
          )}
          {user.blog && (
            <p>
              <strong>Web:</strong>{" "}
              <a href={user.blog} target="_blank" rel="noopener noreferrer">
                {user.blog}
              </a>
            </p>
          )}
          <p>
            <strong>Perfil de GitHub:</strong>{" "}
            <a href={user.html_url} target="_blank" rel="noopener noreferrer">
              {user.html_url}
            </a>
          </p>

          <button
            onClick={() => toggleFavorite(user.login)}
            style={{
              marginTop: "15px",
              padding: "10px",
              cursor: "pointer",
              backgroundColor: isFavorite(user.login)
                ? "lightcoral"
                : "lightgreen",
              border: "none",
              borderRadius: "5px",
            }}
          >
            {isFavorite(user.login)
              ? "Quitar de Favoritos ⭐"
              : "Agregar a Favoritos ☆"}
          </button>
        </div>
      </div>
      {/* Repositorios (si los implementas) */}
      {/* <h3>Repositorios</h3>
           <p>Implementación de listado de repositorios pendiente...</p>
      */}
    </div>
  );
};

export default UserDetailsPage; // Exporta el componente de página
