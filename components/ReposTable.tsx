import { UserRepoDTO } from "@/types/github";

export default function ReposTable({ repos }: { repos: UserRepoDTO[] }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Repository</th>
          <th>Description</th>
          <th>Stack</th>
          <th>Stars</th>
          <th>Forks</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {repos.map((repo) => (
          <tr key={repo.id}>
            <td>
              <strong>{repo.name}</strong>
            </td>
            <td>
              <i>{repo.description || "No description"}</i>
            </td>
            <td>{repo.language && <kbd>{repo.language}</kbd>}</td>
            <td>
              <ins>{repo.stargazers_count ? repo.stargazers_count : ""}</ins>
            </td>
            <td>
              <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                Visit
              </a>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
