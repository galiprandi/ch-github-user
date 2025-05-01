// components/UserTable.tsx (Example without comments)
import { UserDTO } from "@/types/github";
import Image from "next/image";
import Link from "next/link";
import { IconGithub } from "./icons/IconGithub";
import { IconRepo } from "./icons/IconRepo";
import { IconUserDetails } from "./icons/IconUserDetails";

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
          <th scope="col">User</th>
          <th scope="col">Url</th>
          <th scope="col">Details</th>
          <th scope="col">Favorite</th>
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
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Image
                    src={user.avatar_url}
                    alt={user.login}
                    width={50}
                    height={50}
                    style={{
                      borderRadius: "50%",
                      marginRight: 15,
                      flexShrink: 0,
                    }}
                  />
                  <Link href={`/users/${user.login}`} legacyBehavior>
                    <strong>{user.login}</strong>
                  </Link>
                </div>
              </td>

              <td>
                <a
                  href={user.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <IconGithub />
                </a>
              </td>

              <td>
                <nav>
                  <ul>
                    <li>
                      <Link href={`/users/${user.login}`} legacyBehavior>
                        <a className="outline">
                          <IconUserDetails />
                        </a>
                      </Link>
                    </li>

                    <li>
                      <Link href={`/users/${user.login}/repos`} legacyBehavior>
                        <a className="outline">
                          <IconRepo />
                        </a>
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
