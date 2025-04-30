import { UserDTO } from "@/types/github";
import Image from "next/image";
import Link from "next/link";

export default function UserTable({ users }: { users: UserDTO[] }) {
  return (
    <table>
      <thead>
        <tr>
          <th>User</th>
          <th></th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td>
              <strong>
                <Image
                  src={user.avatar_url}
                  alt={user.login}
                  width={50}
                  height={50}
                  style={{ borderRadius: "50%", marginRight: 20 }}
                />{" "}
                {user.login}
              </strong>
            </td>

            <td>
              <a href={user.html_url} target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
            </td>

            <th>
              <Link href={`/users/${user.login}/repos`} legacyBehavior>
                <a style={{ fontWeight: "bold" }}>Repos</a>
              </Link>
            </th>

            <td>
              <Link href={`/users/${user.login}`} legacyBehavior>
                <a style={{ fontWeight: "bold" }}>Details</a>
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
