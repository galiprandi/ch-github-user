import Link from "next/link";
import type {
  NextPage,
  GetStaticProps,
  GetStaticPaths,
  GetStaticPropsContext,
  GetStaticPropsResult,
} from "next";
import { UserDetailedDTO, UserRepoDTO } from "../../../types/github";
import { fetchUserDetails, fetchUserRepos } from "@/lib/githubApi";
import ButtonBack from "@/components/ButtonBack";
import router from "next/router";

const CACHE_DURATION = process.env.CACHE_DURATION
  ? parseInt(process.env.CACHE_DURATION)
  : 86400;

export const getStaticProps: GetStaticProps<
  RepoListProps,
  { username: string }
> = async (
  context: GetStaticPropsContext<{ username: string }>
): Promise<GetStaticPropsResult<RepoListProps>> => {
  const { username } = context.params!;

  try {
    const [user, repos] = await Promise.all([
      fetchUserDetails(username),
      fetchUserRepos(username),
    ]);

    if (!user) {
      return {
        notFound: true,
        revalidate: CACHE_DURATION,
      };
    }

    return {
      props: {
        user,
        repos,
      },
      revalidate: CACHE_DURATION,
    };
  } catch (error) {
    console.error("Error fetching user repos:", error);
    return {
      notFound: true,
      revalidate: CACHE_DURATION,
    };
  }
};

export const getStaticPaths: GetStaticPaths<{
  username: string;
}> = async () => {
  // No pre-generamos paths, se generan bajo demanda
  return {
    paths: [],
    fallback: "blocking",
  };
};

const UserRepoPage: NextPage<RepoListProps> = ({ user, repos, error }) => {
  if (error) {
    return (
      <div>
        <p>{error}</p>
        <Link href={`/users/${user.login}`} legacyBehavior>
          <a>Back to user profile</a>
        </Link>
      </div>
    );
  }

  const displayName = user.name || user.login;

  return (
    <section>
      <nav>
        <ul>
          <li>
            <h1>{displayName}&apos;s: Repositories</h1>
          </li>
        </ul>
        <ul>
          <li>
            <ButtonBack onClick={() => router.back()} />
          </li>
        </ul>
      </nav>

      <section>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Language</th>
              <th>Stars</th>
              <th>Forks</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {repos.map((repo) => (
              <tr key={repo.id}>
                <td>{repo.name}</td>
                <td>{repo.description || "No description"}</td>
                <td>{repo.language}</td>
                <td>{repo.stargazers_count}</td>
                <td>{repo.forks_count}</td>
                <td>
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </section>
  );
};

export default UserRepoPage;

// Interfaces
interface RepoListProps {
  user: UserDetailedDTO;
  repos: UserRepoDTO[];
  error?: string;
}
