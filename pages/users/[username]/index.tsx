import { fetchUserDetails } from "../../../lib/githubApi";
import { useFavorites } from "../../../context/FavoritesContext";
import Link from "next/link";
import type { GetStaticProps, GetStaticPaths, NextPage } from "next";
import type { ParsedUrlQuery } from "querystring";
import { UserDetailedDTO } from "../../../types/github";
import Image from "next/image";
import ButtonBack from "@/components/ButtonBack";
import router from "next/router";

export const getStaticProps: GetStaticProps<UserDetailsProps, Params> = async (context) => {
  const { username } = context.params!;

  try {
    const user = await fetchUserDetails(username);

    if (!user)
      return {
        notFound: true,
        revalidate: 86400,
      };

    return {
      props: {
        user,
      },
      revalidate: 86400, // 1 día
    };
  } catch (error: unknown) {
    console.error("Error fetching user details in getStaticProps:", error);
    return {
      props: {
        error: "Error loading user details.",
      },
      revalidate: 86400,
    };
  }
};

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  // No pre-generamos paths, se generan bajo demanda
  return {
    paths: [],
    fallback: "blocking",
  };
};

const UserDetailsPage: NextPage<UserDetailsProps> = ({ user, error }) => {
  const { isFavorite, toggleFavorite } = useFavorites();

  if (error || !user)
    return (
      <div>
        <p>User not found.</p>
        <Link href="/" legacyBehavior>
          <a>Back to list</a>
        </Link>
      </div>
    );

  const displayName = user.name || user.login;

  return (
    <section>
      <nav>
        <ul>
          <li>
            <h1>{displayName}</h1>
          </li>
        </ul>
        <ul>
          <li>
            <button onClick={() => toggleFavorite(user.login)}>
              {isFavorite(user.login)
                ? "Remove from Favorites ⭐"
                : "Add to Favorites ☆"}
            </button>
          </li>
        </ul>
      </nav>
      <article>
        <div className="grid">
          <div>
            <Image
              src={user.avatar_url}
              alt={`${displayName}'s avatar`}
              width={400}
              height={400}
              style={{ borderRadius: "50%" }}
            />
          </div>
          <div>
            <h2>{displayName}</h2>
            {user.bio && (
              <p>
                <strong>Bio:</strong> {user.bio}
              </p>
            )}

            <p>
              <strong>Followers:</strong> {user.followers}
            </p>
            <p>
              <strong>Following:</strong> {user.following}
            </p>
            <p>
              <strong>Public Repos:</strong> {user.public_repos}{" "}
              <Link href={`/users/${user.login}/repos`} legacyBehavior>
                see repos
              </Link>
            </p>
            {user.location && (
              <p>
                <strong>Location:</strong> {user.location}
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
              <strong>GitHub Profile:</strong>{" "}
              <a href={user.html_url} target="_blank" rel="noopener noreferrer">
                {user.html_url}
              </a>
            </p>
          </div>
        </div>
      </article>
      <br />
      <ButtonBack onClick={() => router.back()} />
    </section>
  );
};

export default UserDetailsPage; // Exporta el componente de página

// Interfaces
interface Params extends ParsedUrlQuery {
  username: string;
}

interface UserDetailsProps {
  user?: UserDetailedDTO;
  error?: string;
}
