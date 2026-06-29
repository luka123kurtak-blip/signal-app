import Link from "next/link";
import { roleButtonStyle } from "@/lib/ui";

type Role = "sender" | "receiver";

const roles: { id: Role; label: string; href: string; color: string }[] = [
  { id: "sender", label: "Відправник", href: "/sender", color: "#3498db" },
  { id: "receiver", label: "Отримувач", href: "/receiver", color: "#9b59b6" },
];

export function RoleSwitcher({ current }: { current?: Role }) {
  return (
    <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
      {roles.map((role) => (
        <Link key={role.id} href={role.href} style={{ textDecoration: "none" }}>
          <button
            type="button"
            style={{
              ...roleButtonStyle,
              width: "auto",
              backgroundColor: role.color,
              opacity: !current || current === role.id ? 1 : 0.55,
              outline: current === role.id ? "3px solid #333" : "none",
            }}
          >
            {role.label}
          </button>
        </Link>
      ))}
    </div>
  );
}
