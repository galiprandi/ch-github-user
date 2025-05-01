import { UserDTO } from "@/types/github";
import Link from "next/link";
import { IconGithub } from "./icons/IconGithub";
import { IconRepo } from "./icons/IconRepo";
import { IconUserDetails } from "./icons/IconUserDetails";
import UserAvatar from "./UserAvatar";

interface UserTableProps {
  users: UserDTO[];
  isFavorite: (username: string) => boolean;
  toggleFavorite: (username: string) => void;
}

export default function UserTable({
  users,
  isFavorite,
  toggleFavorite,
}: UserTableProps) {
  return (
    <table role="grid">
      <thead>
        <tr>
          <th scope="col">Users</th>
          <th scope="col">Links</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        {users.length === 0 ? (
          <tr>
            <td colSpan={5} style={{ textAlign: "center" }}>
              No users found.
            </td>
          </tr>
        ) : (
          users.map((user) => (
            <tr key={user.id}>
              <td>
                <div style={{ display: "flex", alignItems: "center", gap: 30 }}>
                  <UserAvatar
                    src={user.avatar_url}
                    alt={user.login}
                    size={55}
                  />

                  <Link
                    href={`/users/${user.login}`}
                    data-tooltip="User Details"
                  >
                    <strong>{user.login}</strong>
                  </Link>
                </div>
              </td>

              <td>
                <nav>
                  <ul>
                    <li>
                      <a
                        href={user.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-tooltip="GitHub"
                      >
                        <IconGithub />
                      </a>
                    </li>
                    <li>
                      <Link
                        href={`/users/${user.login}`}
                        data-tooltip="User Details"
                      >
                        <IconUserDetails />
                      </Link>
                    </li>

                    <li>
                      <Link
                        href={`/users/${user.login}/repos`}
                        data-tooltip="User Repositories"
                      >
                        <IconRepo />
                      </Link>
                    </li>
                  </ul>
                </nav>
              </td>

              <td>
                <button
                  onClick={() => toggleFavorite(user.login)}
                  style={{
                    cursor: "pointer",
                    backgroundColor: "transparent",
                    border: "none",
                    padding: 0,
                    lineHeight: 1,
                    display: "inline-block",
                  }}
                  data-tooltip="Favorite"
                >
                  <span
                    style={{
                      color: isFavorite(user.login) ? "gold" : "gray",
                      fontSize: "1.5em",
                    }}
                  >
                    {isFavorite(user.login) ? "⭐️" : "☆"}
                  </span>
                </button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}
