import { fetchUserDetails } from "../../../lib/githubApi";
import { useFavorites } from "../../../context/FavoritesContext";
import Link from "next/link";
import type { GetStaticProps, GetStaticPaths, NextPage } from "next";
import type { ParsedUrlQuery } from "querystring";
import { UserDetailedDTO } from "../../../types/github";
import Image from "next/image";
import ButtonBack from "@/components/ButtonBack";
import router from "next/router";

const CACHE_DURATION = process.env.CACHE_DURATION
  ? parseInt(process.env.CACHE_DURATION)
  : 86400;

export const getStaticProps: GetStaticProps<UserDetailsProps, Params> = async (
  context
) => {
  const { username } = context.params!;

  try {
    const user = await fetchUserDetails(username);

    if (!user)
      return {
        notFound: true,
        revalidate: CACHE_DURATION,
      };

    return {
      props: {
        user,
      },
      revalidate: CACHE_DURATION,
    };
  } catch (error: unknown) {
    console.error("Error fetching user details in getStaticProps:", error);
    return {
      props: {
        error: "Error loading user details.",
      },
      revalidate: CACHE_DURATION,
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
        <Link href="/">Back to list</Link>
      </div>
    );

  const displayName = user.name || user.login;

  const {
    login,
    bio,
    avatar_url,
    public_repos,
    followers,
    html_url,
    blog,
    location,
  } = user;

  return (
    <section style={{ maxWidth: 1100, margin: "auto" }}>
      <nav>
        <ul></ul>
        <ul>
          <li>
            <button onClick={() => toggleFavorite(login)}>
              {isFavorite(login) ? "⭐ Favorite" : "☆ Favorite"}
            </button>
          </li>
        </ul>
      </nav>
      <article>
        <div className="grid">
          <Image
            src={avatar_url}
            alt={`${displayName}'s avatar`}
            width={400}
            height={400}
            style={{ borderRadius: "50%" }}
          />
          <div>
            <br />
            <hgroup>
              <h2>{displayName}</h2>
              {bio && <p>{bio}</p>}
            </hgroup>
            <ul>
              {followers > 0 && (
                <li>
                  <strong>Followers:</strong> {user.followers}
                </li>
              )}

              {public_repos > 0 && (
                <li>
                  <strong>Repositories:</strong>
                  <Link href={`/users/${user.login}/repos`}>
                    {" "}
                    {user.public_repos} publics
                  </Link>
                </li>
              )}
              <li>
                <strong>GitHub:</strong>{" "}
                <a href={html_url} target="_blank" rel="noopener noreferrer">
                  {html_url}
                </a>
              </li>
              {blog && (
                <li>
                  <strong>Blog:</strong>{" "}
                  <a href={blog} target="_blank" rel="noopener noreferrer">
                    {blog}
                  </a>
                </li>
              )}
              {location && (
                <li>
                  <strong>Location:</strong> {location}
                </li>
              )}
            </ul>
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
